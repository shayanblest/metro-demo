import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'input[libInputFilter], app-input[libInputFilter]',
  standalone: true,
})
export class InputFilterDirective {

  @Input('libInputFilter') libInputFilter!: string;

  @HostListener('input', ['$event'])
  onInput(e: KeyboardEvent): void {
    const input = e.target as HTMLInputElement;
    const initialValue = input.value;

    input.value = initialValue.replace(this.libInputFilter, '');
    if (initialValue !== input.value) {
      e.stopPropagation();
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent): void {
    const regex = new RegExp(this.libInputFilter);
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  }
}
