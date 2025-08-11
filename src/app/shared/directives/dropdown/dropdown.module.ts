import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { DropdownListDirective } from './dropdown-list.directive';



@NgModule({
  declarations: [
    DropdownDirective,
    DropdownListDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    DropdownListDirective
  ]
})
export class DropdownModule { }
