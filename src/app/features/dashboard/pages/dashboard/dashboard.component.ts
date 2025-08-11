import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HasAccessDirective} from '../../../../shared/directives/has-access/has-access.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor( ) { }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
