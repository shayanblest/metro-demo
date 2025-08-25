import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'input[metroLibInputFilter], metro-input[metroLibInputFilter]',
  standalone: true,
})
export class InputFilterDirective {

  @Input('metroLibInputFilter') metroLibInputFilter!: string;

  @HostListener('input', ['$event'])
  onInput(e: KeyboardEvent): void {
    const input = e.target as HTMLInputElement;
    const initialValue = input.value;

    input.value = initialValue.replace(this.metroLibInputFilter, '');
    if (initialValue !== input.value) {
      e.stopPropagation();
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent): void {
    const regex = new RegExp(this.metroLibInputFilter);
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  }
}
