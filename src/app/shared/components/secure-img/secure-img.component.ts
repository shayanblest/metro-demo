import {Component, Input, OnChanges, OnDestroy, signal, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { Subscription} from 'rxjs';
import {FilesService} from '../../../core/Services/files.service';

@Component({
  selector: 'app-secure-img',
  imports: [],
  templateUrl: './secure-img.component.html',
  styleUrl: './secure-img.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class SecureImgComponent implements OnChanges, OnDestroy {
  @Input() url?: string;
  @Input() cssClass = "";
  @Input() altText = "";
  image = signal("");
  subscriptions: Subscription[] = [];

  constructor(
    private filesService: FilesService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.url) {
      const s = this.filesService.download(this.url).subscribe(blob => {
        this.image.set(URL.createObjectURL(blob));
      });
      this.subscriptions.push(s);
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe());
  }
}
