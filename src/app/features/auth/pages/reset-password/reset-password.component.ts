import {Component, signal} from '@angular/core';
import {InputComponent} from '../../../../shared/components/input/input.component';
import {CommonModule, NgIf} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../../../core/Services/token.service';
import {SubmitButtonDirective, SubmitButtonStatus} from '../../../../shared/directives/button/submit-button.directive';
import {TokenModel} from '../../../../core/models/token.model';
import {HttpErrorResponse} from '@angular/common/http';
import {OtpService} from '../../../../core/Services/otp.service';
import {Subscription} from 'rxjs';
import {UsersService} from '../../services/users.service';
import {UserModel} from '../../../../core/models/user.model';

@Component({
  selector: 'app-reset-password',
  imports: [
    InputComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SubmitButtonDirective,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  otpForm: FormGroup;
  resetPasswordForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private otpService: OtpService,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.otpForm = this.fb.group({
      phoneNumber: this.fb.control('', { validators: [Validators.required, Validators.maxLength(11)] }),
    });
    this.resetPasswordForm = this.fb.group({
      phoneNumber: this.fb.control('', { validators: [Validators.required, Validators.maxLength(11)] }),
      otp: this.fb.control('', { validators: [Validators.required] }),
      newPassword: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  otpSent = signal(false);
  otpButtonStatus = signal<SubmitButtonStatus>('free');
  resetButtonStatus = signal<SubmitButtonStatus>('free');
  statusCode = signal(0);

  get phoneOtpFormControl(): FormControl {
    return this.otpForm.get("phoneNumber") as FormControl;
  }

  sendOtp(): void {
    if (this.otpForm.invalid) {
      return;
    }

    this.resetPasswordForm.get("phoneNumber")?.setValue(this.phoneOtpFormControl.value);

    this.otpButtonStatus.set('processing');
    const s = this.otpService.generate(this.otpForm.value).subscribe({
      next: (res: string) => {
          if (res)
            console.log(res);
          this.otpSent.set(true);
          this.otpButtonStatus.set('free');
      },
      error: (err) => {
        this.otpButtonStatus.set('free');
      }

    });
    this.subscriptions.push(s);
  }

  return(): void {
    this.otpSent.set(false);
    this.statusCode.set(0);
    this.resetPasswordForm.reset();
  }

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.resetButtonStatus.set('processing');
    const s = this.usersService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res: UserModel) => {
        this.resetButtonStatus.set('free');
        this.router.navigate(['/auth', 'sign-in']);
        this.otpSent.set(false);
      },
      error: (err) => {
        this.resetButtonStatus.set('free');
        this.statusCode.set(err.status);
      }
    });
    this.subscriptions.push(s);
  }

}
