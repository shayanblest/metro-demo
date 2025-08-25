import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'input[metroLibMaxLength], metro-input[metroLibMaxLength]',
  standalone: true,
})
export class MaxLengthDirective {
  @Input() metroLibMaxLength!: number;
  @Input() nextFormControl?: string;
  element: HTMLInputElement;

  constructor(
    private eRef: ElementRef
  ) {
    this.element = eRef.nativeElement;
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const selectionStart = this.element.selectionStart || 0;
    const selectionEnd = this.element.selectionEnd || 0;

    const selectionRange = selectionEnd - selectionStart;
    if (event.key == 'Backspace' || event.key == 'Delete' || selectionRange > 0) {
      return;
    }
    const input = event.target as HTMLInputElement;
    const maxLength = this.metroLibMaxLength;

    if (input.value.length >= maxLength) {
      input.value = input.value.slice(0, maxLength)
      this.focusNextInput();
      event.preventDefault();
    }
  }

  private focusNextInput(): void {
    const nextElement = document.querySelector(`[formControlName="${this.nextFormControl}"]`);
    if (nextElement) {
      this.element.querySelector('input')?.blur();
      setTimeout(() => {
        nextElement.querySelector('input')?.focus();
      }, 100)
    }
  }
}
