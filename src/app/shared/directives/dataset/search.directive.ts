import {Directive, ElementRef, Host, HostListener, Injector, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListQuery} from '../../../core/queries/list.query';
import {InputComponent} from '../../components/input/input.component';

@Directive({
  selector: 'input[datasetSearch], app-input[datasetSearch]',
  standalone: true
})
export class SearchDirective {

  @Input() datasetSearch: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private injector: Injector,
    elementRef: ElementRef,
  ) {
    activatedRoute.queryParams.subscribe((params) => {
      const filter = params['search'] as string;
      if (filter == null || filter === '') {
        this.router.navigate(['./'], {
          queryParams: {search: undefined},
          queryParamsHandling: 'merge',
          relativeTo: this.activatedRoute
        });
      } else {
        const regex = /([^.]+):like\((.*?)\)/;
        const match = filter.match(regex);

        if (match) {
          const nativeElement = elementRef.nativeElement as HTMLElement;
          if (nativeElement.tagName === 'INPUT') {
            (nativeElement as HTMLInputElement).value = match[2];
          }
          else {
            const appInput = this.injector.get(InputComponent);
            appInput.writeValue(match[2]);
          }
        }
      }
    })
  }

  @HostListener("input", ['$event.target']) onChange(searchInput: HTMLInputElement): void {
    let qParams: ListQuery = {};
    qParams.page = undefined;
    qParams.search = this.parseArg(searchInput.value);
    if (qParams.search.trim() == "") qParams.search = undefined;
    this.router.navigate(['./'], {queryParams: qParams, queryParamsHandling: 'merge', relativeTo: this.activatedRoute});
  }

  private parseArg(q: string): string {
    let search = "";
    if (q.length > 0)
      for (let i = 0; i < this.datasetSearch.length; i++) {
        if (i != 0) search += '|';
        search += `${this.datasetSearch[i]}:like(${q})`;
      }
    return search;
  }
}

