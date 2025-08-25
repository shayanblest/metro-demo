import { Directive, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ListQuery} from './list.query';

@Directive({
  selector: 'select[metroPageLength]',
  standalone: true
})
export class PageLengthDirective {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  @HostListener("change", ['$event.target']) onChange(lengthSelect: HTMLSelectElement): void {
    const selectedValue = parseInt(lengthSelect.value);

    let qParams: ListQuery = {};
    qParams.page = undefined;
    if (selectedValue == 10)
    qParams.length = undefined;

    else {
      qParams.length = selectedValue;
    }

    this.router.navigate(['./'], { queryParams: qParams, queryParamsHandling: 'merge', relativeTo: this.activatedRoute })
  }


}
