import { Component } from '@angular/core';
import {DropdownComponent} from "../dropdown/dropdown.component";
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {InputComponent} from "../input/input.component";
import {InputFilterDirective} from "../../directives/input-filter/input-filter.directive";
import {MaxLengthDirective} from "../../directives/max-length/max-length.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {roles} from '../../../features/auth/pages/roles/roles-list/roles-list.component';
import {DatetimePickerComponent} from '../datetime-picker/datetime-picker.component';

@Component({
  selector: 'app-demo',
  imports: [
    DropdownComponent,
    FileUploadComponent,
    InputComponent,
    ReactiveFormsModule,
    DatetimePickerComponent
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  protected readonly roles = roles;
}
