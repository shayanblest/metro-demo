import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabSetDirective } from './tab-set.directive';
import { TabHeaderDirective } from './tab-header.directive';
import { TabDirective } from './tab.directive';



@NgModule({
  declarations: [
    TabSetDirective,
    TabHeaderDirective,
    TabDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabSetDirective,
    TabHeaderDirective,
    TabDirective
  ]
})
export class TabsModule { }
