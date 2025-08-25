import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { MetroTranslateService } from '../../services/translate.service';

@Directive({
  selector: '[metroSubmitButton]',
  standalone: true
})
export class SubmitButtonDirective implements OnChanges, OnInit {

  constructor(
    private elementRef: ElementRef,
    private metroTranslate: MetroTranslateService
  ) { }

  @Input() submitButton: SubmitButtonStatus = "free";
  @Input() processingTextKey: string = 'BUTTON.PROCESSING';

  defaultStatus: any;
  button?: HTMLButtonElement;
  translatedProcessingText: string = '';

  ngOnInit(): void {
    this.button = this.elementRef.nativeElement as HTMLButtonElement;

    this.defaultStatus = {
      text: this.button.innerText
    };

    this.translatedProcessingText = this.metroTranslate.instant(this.processingTextKey);
  }

  ngOnChanges(): void {
    if (!this.button) return;

    if (this.submitButton === 'processing') {
      this.button.disabled = true;
      this.button.innerText = this.translatedProcessingText;
    } else {
      this.button.disabled = false;
      this.button.innerText = this.defaultStatus.text;
    }
  }

}

export type SubmitButtonStatus = "processing" | "free";
