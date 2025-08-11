import {Directive, Injector, Input, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ParsedFilter} from '../../../core/queries/list.query';
import {DropdownComponent, DropdownModel} from '../../components/dropdown/dropdown.component';
import {ActivatedRouteService} from '../../../core/Services/activated-route.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: 'app-dropdown[datasetFilter]'
})
export class DatasetFilterDirective implements OnDestroy{

  @Input() datasetFilter: string[] = [];
  parsedFilters: ParsedFilter = {};

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRouteService: ActivatedRouteService,
    private injector: Injector,
    private dropdown: DropdownComponent,
  ) {

    const s1 = dropdown.itemChange.subscribe((res: unknown) => {
      this.onChange(res as DropdownModel)
    });

    const s2 =  this.dropdown.afterItemsLoad
      .subscribe(() => {
        this.syncDropdownSelectionFromFilter();
      });

    const s3 =  activatedRouteService.getParsedFilters().subscribe((filters: ParsedFilter) => {
      this.parsedFilters = filters;
      this.syncDropdownSelectionFromFilter();
    });

    this.subscriptions.push(s1);
    this.subscriptions.push(s2);
    this.subscriptions.push(s3);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange(item: DropdownModel): void {
    const opVal = this.activatedRouteService.parseOpValue(item.value as string);
    if (opVal) {
      this.activatedRouteService.setFilter(this.datasetFilter[0], opVal.op, opVal.value);
    } else {
      this.activatedRouteService.removeFilter(this.datasetFilter[0]);
    }
  }

  private syncDropdownSelectionFromFilter(): void {
    if (!this.dropdown.items?.length) return;
    if (!this.parsedFilters[this.datasetFilter[0]]) return;

    const {op, value} = this.parsedFilters[this.datasetFilter[0]];
    const item = this.dropdown.items.find(
      (i: any) => i.value == `${op}(${value})`
    );
    if (item) this.dropdown.selectItem(item);
  }
}

