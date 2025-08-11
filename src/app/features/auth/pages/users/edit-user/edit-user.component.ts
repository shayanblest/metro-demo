import {Component, OnInit, signal} from '@angular/core';
import {AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {
  SubmitButtonDirective,
  SubmitButtonStatus
} from '../../../../../shared/directives/button/submit-button.directive';
import {InputComponent} from '../../../../../shared/components/input/input.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DropdownComponent} from '../../../../../shared/components/dropdown/dropdown.component';
import {InputFilterDirective} from '../../../../../shared/directives/input-filter/input-filter.directive';
import {Subscription} from 'rxjs';
import {UsersService} from '../../../services/users.service';
import {RoleModel} from '../../../../../core/models/role.model';
import {MaxLengthDirective} from '../../../../../shared/directives/max-length/max-length.directive';
import {roles} from '../../roles/roles-list/roles-list.component';
import {FileUploadComponent} from '../../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-edit-user',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    SubmitButtonDirective,
    DropdownComponent,
    InputFilterDirective,
    MaxLengthDirective,
    FileUploadComponent,
  ],
  templateUrl: './edit-user.component.html',
  standalone: true,
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  form: UntypedFormGroup;
  buttonStatus = signal<SubmitButtonStatus>('free');

  id?: string;
  subscriptions: Subscription[] = [];

  roles = signal<RoleModel[]>([]);

  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [''],
      password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      nationalCode: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      role: ['', Validators.required],
      countyId: [null],
      provinceId: [null],
    }, {
      validators: this.passwordsMatchValidator
    });
    this.buttonStatus.set('free');
  }

  get countyIdFormControl(): AbstractControl | null {
    return this.form.get('countyId');
  }

  get roleFormControl(): AbstractControl | null {
    return this.form.get('role');
  }

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({mismatch: true});
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }

    return null;
  }

  ngOnInit(): void {
    this.getRoles();
  }

  save(): void {
  }

  private getRoles(): void {
    this.roles.set(roles)
  }

}
