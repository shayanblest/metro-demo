import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HasAccessDirective} from '../../../../shared/directives/has-access/has-access.directive';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class AsideComponent {

}
