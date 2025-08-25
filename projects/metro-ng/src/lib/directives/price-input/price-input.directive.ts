import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[metroPriceInput]'
})
export class PriceInputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/,/g, '');
    if (!isNaN(value)) {
      input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      input.value = value.replace(/[^0-9]/g, '');
    }
  }

}
