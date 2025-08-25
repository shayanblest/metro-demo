
import { Directive, ElementRef, EventEmitter, Inject, Output, Renderer2, DOCUMENT } from '@angular/core';

@Directive({
  selector: '[metro-modal]',
  standalone: true,
  exportAs: 'modal'
})
export class ModalDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    if (!this.nativeElement) {
      this.nativeElement = elementRef.nativeElement
    }
    this.backDropElement = doc.createElement('div');
  }

  nativeElement!: HTMLElement;
  backDropElement?: HTMLElement;


  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  show() {
    this.backDropElement?.classList.add("modal-backdrop", "fade", "show")
    this.renderer.appendChild(this.doc.body, this.backDropElement)
    this.nativeElement.style.display = 'block';
  }

  hide() {
    this.renderer.removeChild(this.doc.body, this.backDropElement);
    this.nativeElement.style.display = 'none';
    this.close.emit();
  }
}
