import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from '../../directives/modal/modal.directive';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    exportAs: 'alert',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ModalDirective,
        CommonModule
    ]
})
export class AlertComponent {

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild("alertModal") modal!: ModalDirective;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  protected options: AlertOptions = {};

  protected canClose: boolean = true;

  fire(opts: AlertOptions): void {
    this.options = opts;
    this.modal.show();
    this.cdr.detectChanges();
  }

  close(): void {
    this.modal.hide();
  }

  protected onConfirm(): void {
    this.confirm.emit();
  }


  fireLoading(text: string): void {
    this.options.icon = 'loading';
    this.options.showConfirmButton = false;
    this.options.showDenyButton = false;
    this.options.showCancelButton = false;
    this.options.title = undefined
    this.options.text = text;
    this.canClose = false;
    this.fire(this.options);
  }

  fireConfirm(title: string, text: string, icon: AlertIcon): void {
    this.options = {
      text: text,
      title: title,
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: false,
      icon: icon
    };
    this.canClose = true;
    this.fire(this.options);
  }

  fireResult(title: string, text: string, icon: AlertIcon) {
    this.options = {
      text: text,
      title: title,
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: true,
      icon: icon
    };
    this.canClose = true;
    this.fire(this.options);
  }


}

export type AlertIcon = "success" | "danger" | "warning" | "info" | "loading";

export interface AlertOptions {
  title?: string;
  text?: string;
  icon?: AlertIcon;
  showConfirmButton?: boolean;
  showDenyButton?: boolean;
  showCancelButton?: boolean;
}