import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ListQuery} from '../../../core/queries/list.query';
import {Observable} from 'rxjs';
import {ListResultModel} from '../../../core/models/list-result.model';
import {toHttpParams} from '../../../shared/utils/http.utils';
import {EditUserCommand} from '../commands/users/edit-user.command';
import {RoleModel} from '../../../core/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl = `${environment.apiBaseUrl}/roles`;

  constructor(
    private http: HttpClient,
  ) {}

  list(query: ListQuery): Observable<ListResultModel<RoleModel>> {
    return this.http.get<ListResultModel<RoleModel>>(this.baseUrl, {params: toHttpParams(query)});
  }

  get(id: string): Observable<RoleModel> {
    return this.http.get<RoleModel>(`${this.baseUrl}/${id}`);
  }

  save(command: EditUserCommand): Observable<RoleModel> {
    if (command.id)
      return this.http.put<RoleModel>(this.baseUrl, command);
    else
      return this.http.post<RoleModel>(this.baseUrl, command);
  }

  delete(id: string): Observable<RoleModel> {
    return this.http.delete<RoleModel>(`${this.baseUrl}/${id}`);
  }
}
