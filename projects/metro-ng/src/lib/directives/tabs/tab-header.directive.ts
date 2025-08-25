import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { TabSetDirective } from './tab-set.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
    selector: '[metroTabHeader]',
    standalone: false
})
export class TabHeaderDirective {


  constructor(
    private tabset: TabSetDirective,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }



  @Input() metroTabHeader!: string;

  @HostBinding("class.active") isActive: boolean = false;

  @HostListener("click") onClick(): void {
    const firstTab = this.tabset.headers.first;
    let param = undefined;
    if (this.metroTabHeader != firstTab.metroTabHeader) {
      param = this.metroTabHeader;
    }

    this.router.navigate(['./'], { queryParams: { tab: param }, queryParamsHandling: 'merge', relativeTo: this.activatedRoute });
  }



}
