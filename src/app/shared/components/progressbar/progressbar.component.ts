import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersianDigitsPipe} from '../../pipes/persian-digits.pipe';

@Component({
  selector: 'app-progressbar',
  imports: [CommonModule, PersianDigitsPipe],
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ProgressbarComponent {
  @Input() percent!: number;
  @Input() showPercent: boolean = false;
}
