import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[submitButton]',
  standalone: true
})
export class SubmitButtonDirective implements OnChanges, OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  @Input()  submitButton: SubmitButtonStatus = "free";
  @Input() proccessingText: string = "در حال ذخیره...";

  defaultStatus: any;
  button?: HTMLButtonElement;

  ngOnInit(): void {
    this.button = this.elementRef.nativeElement as HTMLButtonElement;
    const buttonStatus = {
      text: this.button.innerText
    };
    this.defaultStatus = { ...buttonStatus };
  }

  ngOnChanges(): void {

    if (this.button) {
      if (this.submitButton == 'processing') {

        this.button.disabled = true;
        this.button.innerText = this.proccessingText;
      }
      else {
        this.button.disabled = false;
        this.button.innerText = this.defaultStatus.text;
      }
    }
  }

}

export type SubmitButtonStatus = "processing" | "free";
