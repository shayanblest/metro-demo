import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation, WritableSignal
} from '@angular/core';
import {convertImageToBase64, isImage} from '../../utils/file.utils';
import {CommonModule} from '@angular/common';
import {ProgressbarComponent} from '../progressbar/progressbar.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    ProgressbarComponent
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {

  @Input() progress = signal(0);
  @Input() showPreview = false;
  protected file?: File;
  @Output() protected progressChange = new EventEmitter<number>();
  @Output() protected fileChange: EventEmitter<File> = new EventEmitter();
  @Output() protected fileRemove = new EventEmitter<void>();
  protected image: WritableSignal<string | undefined> = signal(undefined);
  private fileBase = environment.fileBase;

  constructor() {
  }

  setFile(f: File | string | Blob): void {
    if (f instanceof File) {
      this.file = f;
      if (this.file && isImage(this.file) && this.showPreview) {
        convertImageToBase64(this.file).then((base64: string) => {
          this.image.set(base64);
        });
      } else {
        this.image.set(undefined);
      }
    }
    else if (typeof f === 'string') {
      this.image.set(`${this.fileBase}${f}`);
      this.progress.set(101);
    }
    else if (f instanceof Blob) {
      this.image.set(URL.createObjectURL(f));
      this.progress.set(101);
    }
  }

  protected fileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.file = input.files?.[0];
    if (this.file) {
      if (isImage(this.file)) {
        convertImageToBase64(this.file).then((base64: string) => {
          this.image.set(base64);
        });
      }
    }
    this.fileChange.emit(this.file);
  }


  removeFile(): void {
    this.fileRemove.emit();
    this.reset();
  }

  protected reset(): void {
    this.file = undefined;
    this.image.set(undefined);
    this.progress.set(0);
    this.progressChange.emit(0);
  }
}
