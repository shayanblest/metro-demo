import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginUserCommand} from '../commands/users/login-user.command';
import {environment} from '../../../../environments/environment';
import {TokenModel} from '../../../core/models/token.model';

@Injectable()
export class AuthService {

  private baseUrl = `${environment.apiBaseUrl}/tokens`;
  constructor(
    private http: HttpClient,
  ) { }

  login(command: LoginUserCommand): Observable<TokenModel> {
    return this.http.post<TokenModel>(this.baseUrl, command)
  }
}
