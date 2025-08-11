import {Component, OnInit, signal} from '@angular/core';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {InputComponent} from '../../../../../shared/components/input/input.component';
import {
  SubmitButtonDirective,
  SubmitButtonStatus
} from '../../../../../shared/directives/button/submit-button.directive';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {RolesService} from '../../../services/roles.service';
import {RoleModel} from '../../../../../core/models/role.model';
import {CommonModule} from '@angular/common';
import {PERMISSION_RESOURCES} from '../../../DTOs/permission.dto';
import {Subscription} from 'rxjs';
import {HasAccessDirective} from '../../../../../shared/directives/has-access/has-access.directive';

@Component({
  selector: 'app-edit-role',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SubmitButtonDirective,
    RouterModule
  ],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent {
  form: UntypedFormGroup;
  roleId?: string;
  permissionsResources = PERMISSION_RESOURCES;
  subscriptions: Subscription[] = [];

  buttonStatus = signal<SubmitButtonStatus>('free');

  constructor(
    private fb: UntypedFormBuilder,
  ) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      permissions: fb.array(this.permissionsResources.map(p =>
        this.fb.group({
          resource: [p.name],
          actions: this.fb.group({
            C: [false],
            R: [false],
            U: [false],
            D: [false],
          })
        })
      ))
    });
  }

  edit(): void {

  }
}


