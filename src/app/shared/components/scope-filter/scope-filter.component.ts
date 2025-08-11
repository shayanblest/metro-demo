import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {AdminLevelDirective} from "../../directives/admin-level/admin-level.directive";
import {DropdownComponent, DropdownModel} from "../dropdown/dropdown.component";
import {ProvincesService} from '../../../core/Services/provinces.service';
import {CountiesService} from '../../../core/Services/counties.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListQuery, ParsedFilter, parseFilterString} from '../../../core/queries/list.query';
import {ProvinceModel} from '../../../core/models/province.model';
import {CountyModel} from '../../../core/models/county.model';
import {ListResultModel} from '../../../core/models/list-result.model';
import {Subscription} from 'rxjs';
import {TokenService} from '../../../core/Services/token.service';
import {DatasetFilterDirective} from '../../directives/dataset/dataset-filter.directive';
import {ActivatedRouteService} from '../../../core/Services/activated-route.service';

@Component({
  selector: 'app-scope-filter',
  imports: [
    AdminLevelDirective,
    DropdownComponent,
    DatasetFilterDirective
  ],
  templateUrl: './scope-filter.component.html',
  styleUrl: './scope-filter.component.scss'
})
export class ScopeFilterComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  parsedFilter?: ParsedFilter;
  filter?: string;


  selectedProvince = signal<DropdownModel | undefined>(undefined);
  selectedCounty = signal<DropdownModel | undefined>(undefined);
  counties = signal<DropdownModel[]>([]);
  provinces = signal<DropdownModel[]>([]);

  @Input() modelPrefix?: string;

  constructor(
    private activatedRouteService: ActivatedRouteService,
    private provincesService: ProvincesService,
    private countiesService: CountiesService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    const currentUser = this.tokenService.getJwtInfo();
    if (currentUser) {
      if (this.tokenService.isNationalAdmin())
        this.getProvinces();
      else if (this.tokenService.isProvinceAdmin()) {
        this.getProvince(currentUser.provinceId!);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  provinceChanged(province: unknown): void {
    this.selectedProvince.set(province as DropdownModel);
    if (this.selectedProvince()?.value)
      this.getCounties();
    else {
      this.counties.set([]);
      this.selectedCounty.set({text: "همه شهرستان ها", value: ''});
    }
  }

  countiesChanged(county: unknown): void {
    this.selectedCounty.set(county as DropdownModel);
  }

  private getProvinces(): void {
    const provincesListQuery: ListQuery = {
      page: 1,
      length: 50
    }
    const s =
      this.provincesService.list(provincesListQuery).subscribe({
        next: (res: ListResultModel<ProvinceModel>) => {
          this.provinces.set([
            {text: "همه استان ها", value: ''},
            ...res.elements.map(m => ({ text: m.name, value: `eq(${m.id})` })),
          ]);
          const provinceFilter = this.parsedFilter?.[`${this.modelPrefix ? this.modelPrefix + '.' : ''}County.ProvinceId`];
          if (provinceFilter) {
            const province = this.provinces().find(p => p.value === provinceFilter.value);
            if (province) {
              this.getCounties();
              return;
            }
          } else {
            this.selectedProvince.set(this.provinces()[0]);
          }
        }
      });
    this.subscriptions.push(s);
  }

  private getProvince(provinceId: number): void {
    const s =
      this.provincesService.get(provinceId).subscribe({
        next: (res: ProvinceModel) => {
          if (res) {
            this.selectedProvince.set({text: res.name, value: res.id});
            this.getCounties();
          }
        }
      });
    this.subscriptions.push(s);
  }

  private getCounties(): void {
    const pid = this.activatedRouteService.parseOpValue(this.selectedProvince()!.value as string);
    const provinceId = parseInt(pid?.value!)
    if (!provinceId) {
      return;
    }
    const countiesListQuery: ListQuery = {
      page: 1,
      length: 50,
      filter: `ProvinceId:eq(${provinceId})`
    }
    const s =
      this.countiesService.list(countiesListQuery).subscribe({
        next: (res: ListResultModel<CountyModel>) => {
          this.counties.set([
            {text: "همه شهرستان ها", value: ''},
            ...res.elements.map(m => ({ text: m.name, value: `eq(${m.id})` }))
          ]);
          const countyFilter = this.parsedFilter?.[`${this.modelPrefix ? this.modelPrefix + '.' : ''}CountyId`];
          if (countyFilter) {
            const county = this.counties().find(p => p.value === countyFilter.value);
            if (county) {
              this.selectedCounty.set(county);
              return;
            }
          } else
            this.selectedCounty.set(this.counties()[0]);
        }
      });
    this.subscriptions.push(s);
  }

  // private setFilter(): void {
  //   const province = this.selectedProvince();
  //   const county = this.selectedCounty();
  //
  //   const filters: string[] = [];
  //
  //   if (province?.id) {
  //     if (this.tokenService.isNationalAdmin()) {
  //       filters.push(`${this.modelPrefix ? this.modelPrefix + '.' : ''}County.ProvinceId:eq(${province.id})`);
  //     }
  //     if (county?.id && county.provinceId === province.id) {
  //       filters.push(`${this.modelPrefix ? this.modelPrefix + '.' : ''}CountyId:eq(${county.id})`);
  //     }
  //   }
  //
  //   const qParams: ListQuery = {
  //     page: undefined,
  //     filter: filters.length ? filters.join(',') : undefined
  //   };
  //
  //   this.router.navigate(
  //     ['./'],
  //     {
  //       queryParams: qParams,
  //       queryParamsHandling: 'merge',
  //       relativeTo: this.activatedRoute
  //     }
  //   );
  // }
}
