import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { TabSetDirective } from './tab-set.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
    selector: '[tabHeader]',
    standalone: false
})
export class TabHeaderDirective {


  constructor(
    private tabset: TabSetDirective,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }



  @Input() tabHeader!: string;

  @HostBinding("class.active") isActive: boolean = false;

  @HostListener("click") onClick(): void {
    const firstTab = this.tabset.headers.first;
    let param = undefined;
    if (this.tabHeader != firstTab.tabHeader) {
      param = this.tabHeader;
    }

    this.router.navigate(['./'], { queryParams: { tab: param }, queryParamsHandling: 'merge', relativeTo: this.activatedRoute });
  }



}
