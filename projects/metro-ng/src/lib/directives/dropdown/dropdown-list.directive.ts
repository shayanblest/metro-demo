import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[metroDropdownList]',
    standalone: false
})
export class DropdownListDirective {

  constructor() { }

  @HostBinding("class.show") show: boolean = false;


}
