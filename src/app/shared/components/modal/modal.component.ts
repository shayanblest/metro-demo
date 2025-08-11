import { Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnDestroy {

  @ContentChild("body") protected bodyTemplate?: TemplateRef<unknown>;
  @ContentChild("title") protected titleTemplate?: TemplateRef<unknown>;
  @ViewChild("backDropRef") protected backDropRef?: ElementRef<unknown>;

  @Output() modalClose: EventEmitter<void>;

  @Input() cssClass = "";
  @Input() headerClass = "";
  @Input() bodyClass = "";
  @Input() closable = true;

  private nativeElement: HTMLElement;

  protected isOpen: boolean;

  constructor(
    private elementRef: ElementRef
  ) {
    this.nativeElement = elementRef.nativeElement;
    this.close();
    this.modalClose = new EventEmitter<void>();
    this.isOpen = false;
  }
  open(): void {
    this.nativeElement.style.display = 'block';
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    if (!this.closable) {
      return;
    }
    this.nativeElement.style.display = 'none';
    this.isOpen = false;
    document.body.style.overflow = 'auto';
    if (this.modalClose) {
      this.modalClose.emit();
    }
  }

  closeFromBackDrop(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement;
    const ref = this.backDropRef;
    if (ref) {
      const backDropElement = ref.nativeElement as HTMLElement;
      if (!backDropElement) {
        return;
      }

      if (targetElement !== backDropElement) {
        return;
      }
    }
    this.close();
  }
  ngOnDestroy(): void {
    this.closable = true;
    this.close();
  }
}
