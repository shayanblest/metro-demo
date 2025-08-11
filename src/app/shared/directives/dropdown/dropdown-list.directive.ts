import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[dropdownList]',
    standalone: false
})
export class DropdownListDirective {

  constructor() { }

  @HostBinding("class.show") show: boolean = false;
  

}
