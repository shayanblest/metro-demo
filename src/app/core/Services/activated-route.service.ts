import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {buildFilterString, ListQuery, ParsedFilter, parseFilterString} from '../queries/list.query';

@Injectable()
export class ActivatedRouteService {

  route: ActivatedRoute;
  private parsedFilters: ParsedFilter = {};
  private parsedFilters$: BehaviorSubject<ParsedFilter> = new BehaviorSubject({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.route = activatedRoute;
    activatedRoute.queryParams.subscribe((params) => {
      const filter = params['filter'] as string;
      this.parsedFilters = parseFilterString(filter) || {};
      if (filter == null || filter === '') {
        this.router.navigate(['./'], {
          queryParams: {filter: undefined},
          queryParamsHandling: 'merge',
          relativeTo: this.activatedRoute
        });
      } else {
        this.parsedFilters$.next(this.parsedFilters);
      }
    })
  }

  listParams(listParams?: ListQuery): Observable<ListQuery> {
    return this.activatedRoute.queryParams.pipe(
      map((param: Params) => {

        if (listParams === undefined) {
          listParams = {
            page: +param['page'] || 1,
            length: +param['length'] || 10
          }
        } else {
          listParams.page = +param['page'] || 1;
          listParams.length = +param['length'] || 10;
        }

        if (param['search'])
          listParams.search = param['search'];
        else
          listParams.search = undefined;

        if (param['filter']) {
          listParams.filter = param['filter'];
          this.parsedFilters = parseFilterString(listParams.filter);
        } else
          listParams.filter = undefined;

        if (param['include'])
          listParams.include = param['include'];

        if (param['sort'])
          listParams.sort = param['sort']
        else
          listParams.sort = undefined;

        return listParams;
      })
    );
  }

  getParsedFilters(): Observable<ParsedFilter> {
    return this.parsedFilters$.asObservable();
  }

  setFilter(field: string, operation: string, value: string): void {
    this.parsedFilters[field] = {
      op: operation,
      value: value,
    };
    this.navigate();
  }

  removeFilter(field: string): void {
    delete this.parsedFilters[field];
    this.navigate();
  }

  parseOpValue(input: string): { op: string; value: string } | null {
    const match = input.match(/^(\w+)\((.*)\)$/);
    if (!match) return null;
    const [, op, value] = match;
    return {op, value};
  }

  private navigate(): void {
    let qParams: ListQuery = {};
    qParams.filter = buildFilterString(this.parsedFilters);
    if (qParams.filter == null || qParams.filter === '') {
      this.router.navigate(['./'], {
        queryParams: {filter: undefined},
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute
      });
    } else
      this.router.navigate(['./'], {
        queryParams: qParams,
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute
      });
  }
}
