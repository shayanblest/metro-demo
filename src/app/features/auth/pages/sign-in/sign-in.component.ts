import { Component, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../../../core/Services/token.service';
import {Router, RouterLink} from '@angular/router';
import {SubmitButtonDirective, SubmitButtonStatus} from '../../../../shared/directives/button/submit-button.directive';
import {TokenModel} from '../../../../core/models/token.model';
import {HttpErrorResponse} from '@angular/common/http';
import {InputComponent} from '../../../../shared/components/input/input.component';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-sign-in',
    imports: [
        CommonModule,
        SubmitButtonDirective,
        ReactiveFormsModule,
        InputComponent,
        RouterLink
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [AuthService]
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      userName: this.fb.control('', { validators: [Validators.required] }),
      password: this.fb.control('', { validators: [Validators.required] }),
      remember: this.fb.control(true, { validators: [Validators.requiredTrue] }),
    });
  }


  buttonStatus = signal<SubmitButtonStatus>('free');
  statusCode = signal(0);

  ngOnInit(): void {
    if (this.tokenService.isTokenValid()) {
      this.router.navigate(['/']);
    }
    // this.tokenService.removeAccessToken();
  }

  login(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.buttonStatus.set('processing');

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res: TokenModel) => {
        this.tokenService.setAccessToken(res.accessToken);
        this.router.navigate(['/']);
        this.buttonStatus.set('free');
      },
      error: (e: HttpErrorResponse) => {
        this.statusCode.set(e.status);
        this.buttonStatus.set('free');
      }
    });
  }
}
