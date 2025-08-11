import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[ConvertEmptyNull]'
})
export class ConvertEmptyNullDirective {
  constructor(
    private control: NgControl
  ) {
  }

  @HostListener('input')
  onInput(): void {
    const value = this.control.control?.value;
    if (value === '') {
      this.control.control?.setValue(null, { emitEvent: false });
    }
  }

  @HostListener('blur')
  onBlur(): void {
    const value = this.control.control?.value;
    if (value === '') {
      this.control.control?.setValue(null, { emitEvent: false });
    }
  }
}
