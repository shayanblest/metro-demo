import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ListResultModel} from '../models/list-result.model';
import {RoleModel} from '../models/role.model';
import {
  FileUploadResponse,
  UploadError,
  UploadProgress,
  UploadResponse
} from '../models/upload-response.model';
import {toFormData} from '../../shared/utils/http.utils';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private baseUrl = `${environment.apiBaseUrl}/FileUpload`;

  constructor(
    private http: HttpClient,
  ) { }

  upload(file: File): Observable<ListResultModel<RoleModel>> {
    return this.http.post<ListResultModel<RoleModel>>(this.baseUrl, file);
  }

  uploadFileWithProgress<T>(
    method: string,
    command: unknown,
    uploadUrl: string,
  ): Observable<FileUploadResponse<T>> {
    const progressSubject = new Subject<FileUploadResponse<T>>();

    const req = new HttpRequest(method, uploadUrl, toFormData(command), {
      reportProgress: true,
    });

    this.http.request(req).subscribe({
      next: (event) => {
        const progress: UploadProgress = {
          progress: 0,
          completed: false,
        };

        if (event.type === HttpEventType.UploadProgress) {
          progress.progress = Math.round(100 * event.loaded / (event.total || 1));
          progressSubject.next(progress);
        } else if (event instanceof HttpResponse) {
          const response: UploadResponse<T> = {
            response: event.body as T,
          };

          progressSubject.next({
            ...progress,
            progress: 100,
            completed: true,
            ...response,
          });
          progressSubject.complete();
        }
      },
      error: (error) => {
        const errorResponse: UploadError = { error };
        progressSubject.next({
          progress: 0,
          completed: false,
          ...errorResponse,
        });
        progressSubject.error(error);
      },
    });

    return progressSubject.asObservable();
  }

  download(fileUrl: string): Observable<Blob> {
    const encodedFileUrl = encodeURIComponent(fileUrl);
    return this.http.get(`${environment.apiBaseUrl}/Files/${encodedFileUrl}`, {
      responseType: 'blob'
    });
  }

  delete(name: string): Observable<RoleModel> {
    return this.http.delete<RoleModel>(`${this.baseUrl}/`, { body: { fileName: name } });
  }

}
