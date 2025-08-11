import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[tab]',
    standalone: false
})
export class TabDirective {

  constructor() { }

  @Input() tab!: string;

  @HostBinding("class.active") isActive: boolean = false;


}
