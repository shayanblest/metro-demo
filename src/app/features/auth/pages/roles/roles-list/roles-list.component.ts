import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {PageLengthDirective} from "../../../../../shared/directives/page-length/page-length.directive";
import {PaginationComponent} from "../../../../../shared/components/pagination/pagination.component";
import {RoleModel} from '../../../../../core/models/role.model';
import {ListQuery} from '../../../../../core/queries/list.query';
import {Subscription} from 'rxjs';
import {HasAccessDirective} from '../../../../../shared/directives/has-access/has-access.directive';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-roles-list',
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent,
    PageLengthDirective,
    HasAccessDirective
  ],
    templateUrl: './roles-list.component.html',
    styleUrl: './roles-list.component.scss'
})
export class RolesListComponent {

  roles = signal<RoleModel[]>(roles);
  listQuery: ListQuery = {
    page: 1,
    length: 10
  };
  total = signal(0);

  subscriptions: Subscription[] = [];
}

export const roles = [
  {
    displayName: "مسئول مالی",
    createdAt: "2025-07-14T07:29:12.0335251",
    updatedAt: "2025-07-14T07:29:12.3358345",
    id: "7b87968f-9eaf-466e-9e3b-82f9e9a49152",
    name: "FinanceAdmin",
    normalizedName: "FINANCEADMIN",
    concurrencyStamp: "7c61389b-c8d2-4d2a-979e-f28759fa36ba"
  },
  {
    displayName: "مدیر ارشد",
    createdAt: "2025-07-01T08:24:08.7200929",
    updatedAt: "2025-07-06T15:52:36.8121661",
    id: "9bf08ae1-e627-4711-aebc-25377e152ee8",
    name: "SuperAdmin",
    normalizedName: "SUPERADMIN",
    concurrencyStamp: "0ddd82c6-c3ce-4d97-9230-cdfa2afe5236"
  },

  {
    displayName: "مدیر",
    createdAt: "2025-07-01T08:24:08.7064871",
    updatedAt: "2025-07-12T05:29:07.9378083",
    id: "2e02abe8-8867-4ec7-b31f-817545c8ec1c",
    name: "Admin",
    normalizedName: "ADMIN",
    concurrencyStamp: "3aa36714-55ab-41fa-a369-cb5f7c309138"
  },
  {
    displayName: "برنامه نویس",
    createdAt: "2025-07-01T08:24:08.5792761",
    updatedAt: null,
    id: "2ba27de2-b042-4846-aeac-a903e6b509e4",
    name: "Programmer",
    normalizedName: "PROGRAMMER",
    concurrencyStamp: null
  }
];
