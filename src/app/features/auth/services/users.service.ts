import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ListResultModel} from '../../../core/models/list-result.model';
import {ListQuery} from '../../../core/queries/list.query';
import {toHttpParams} from '../../../shared/utils/http.utils';
import {UserModel} from '../../../core/models/user.model';
import {EditUserCommand} from '../commands/users/edit-user.command';
import {ResetPasswordCommand} from '../commands/users/reset-password.command';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(
    private http: HttpClient,
  ) {
  }

  list(query: ListQuery): Observable<ListResultModel<UserModel>> {
    return this.http.get<ListResultModel<UserModel>>(this.baseUrl, {params: toHttpParams(query)});
  }

  get(id: string): Observable<UserModel> {
    const query = {
      include: 'County.Province',
    }
    return this.http.get<UserModel>(`${this.baseUrl}/${id}`, {params: toHttpParams(query)});
  }

  add(command: EditUserCommand): Observable<UserModel> {
    if (command.id)
      return this.http.put<UserModel>(`${this.baseUrl}`, command);
    else
      return this.http.post<UserModel>(this.baseUrl, command);
  }

  edit(command: EditUserCommand): Observable<UserModel> {
    return this.http.put<UserModel>(this.baseUrl, command);
  }

  resetPassword(command: ResetPasswordCommand): Observable<UserModel> {
    return this.http.patch<UserModel>(this.baseUrl, command);
  }

  delete(id: string): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.baseUrl}/${id}`);
  }
}
