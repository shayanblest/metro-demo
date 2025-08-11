import {Component, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {ListQuery} from '../../../../../core/queries/list.query';
import {PageLengthDirective} from '../../../../../shared/directives/page-length/page-length.directive';
import {PaginationComponent} from '../../../../../shared/components/pagination/pagination.component';
import {SearchDirective} from '../../../../../shared/directives/dataset/search.directive';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UserModel} from '../../../../../core/models/user.model';
import {Subscription} from 'rxjs';
import {PersianDigitsPipe} from '../../../../../shared/pipes/persian-digits.pipe';
import {InputFilterDirective} from '../../../../../shared/directives/input-filter/input-filter.directive';
import {InputComponent} from '../../../../../shared/components/input/input.component';
import {ActivatedRouteService} from '../../../../../core/Services/activated-route.service';
import {ButtonGroupComponent} from '../../../../../shared/components/button-group/button-group.component';
import {exporters} from '../../../../../core/constants/exporters';
import {DropdownComponent, DropdownModel} from '../../../../../shared/components/dropdown/dropdown.component';
import {DatasetFilterDirective} from '../../../../../shared/directives/dataset/dataset-filter.directive';

@Component({
  selector: 'app-users-list',
  imports: [
    CommonModule,
    RouterModule,
    PageLengthDirective,
    PaginationComponent,
    SearchDirective,
    PersianDigitsPipe,
    InputFilterDirective,
    InputComponent,
    ButtonGroupComponent,
    DropdownComponent,
    DatasetFilterDirective,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [ActivatedRouteService]
})
export class UsersListComponent implements OnInit {

  users = signal<UserModel[]>(users);
  total = signal(0);

  genderFilters: DropdownModel[] = [
    {text: "همه", value: ""},
    {text: "مرد", value: "eq(1)"},
    {text: "زن", value: "eq(2)"},
  ]

  subscriptions: Subscription[] = [];
  listQuery: ListQuery = {
    page: 1,
    length: 10,
  };

  protected readonly exporters = exporters;

  constructor(
    private activatedRoute: ActivatedRouteService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.listParams().subscribe((params: ListQuery) => {
      console.log(params)
    });
  }
}


const users = [
  {
    id: "9e651c3d-acd3-4b24-8e59-19c2e7888f08",
    userName: "666666666666",
    phoneNumber: "666666666666",
    firstName: "علی",
    lastName: "علیزاده",
    nationalCode: "4323931549",
    roles: ["مسئول مالی"]
  },
  {
    id: "03681820-1130-45fd-8065-a2a20f64087f",
    userName: "33333333333",
    phoneNumber: "33333333333",
    firstName: "فاطمه",
    lastName: "شیراز میهن",
    roles: ["مدیر"]
  },
  {
    id: "a2c4402b-2ee3-4b49-a73d-ec711c0022e1",
    userName: "22222222222",
    phoneNumber: "22222222222",
    firstName: "میلاد",
    lastName: "فداکار",
    roles: ["مدیر ارشد"]
  },
  {
    id: "5a6cc4b3-3b3b-4fc9-af72-439720104588",
    userName: "09145065451",
    phoneNumber: "09145065451",
    firstName: "شایان",
    lastName: "خجسته منش",
    nationalCode: "1720129411",
    roles: ["برنامه نویس"]
  }
];
