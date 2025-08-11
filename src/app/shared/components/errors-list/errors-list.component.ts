import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ApiError} from '../../../core/models/api-error.model';

@Component({
  selector: 'app-errors-list',
  imports: [],
  templateUrl: './errors-list.component.html',
  styleUrl: './errors-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ErrorsListComponent {
  @Input() error?: ApiError;
}
