import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal
} from '@angular/core';
import {DropdownModel} from '../dropdown/dropdown.component';

@Component({
  selector: 'app-button-group',
  imports: [],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent {

  @Input() label!: string;
  @Input() items: DropdownModel[] = [];
  @Output() itemClick: EventEmitter<DropdownModel> = new EventEmitter();

  isOpen = signal<boolean>(false)

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false)
    }
  }

  openMenu(): void {
    this.isOpen.update(m => !m);
  }

  onItemClick(e: DropdownModel) {
    this.itemClick.emit(e);
    this.isOpen.set(false);
  }

}
