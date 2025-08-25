import { Directive, HostListener, OnInit } from '@angular/core';
import { ModalDirective } from './modal.directive';

@Directive({
  selector: '[metroModalClose]',
  standalone: true
})
export class ModalCloseDirective {

  constructor(
    private modal: ModalDirective
  ) { }

  @HostListener("click") onClick(): void {
    this.modal.hide();
  }
}
