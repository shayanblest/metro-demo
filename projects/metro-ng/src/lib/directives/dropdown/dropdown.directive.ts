import { ContentChild, Directive, HostListener } from '@angular/core';
import { DropdownListDirective } from './dropdown-list.directive';

@Directive({
    selector: '[metroDropdown]',
    standalone: false
})
export class DropdownDirective {

  constructor() { }

  @ContentChild(DropdownListDirective) list!: DropdownListDirective;

  @HostListener("click") onClick(): void {
    this.list.show = !this.list.show;
  }

}
