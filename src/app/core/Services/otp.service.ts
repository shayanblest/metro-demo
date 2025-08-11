import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenerateOtpCommand} from '../commands/generate-otp.command';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private baseUrl = `${environment.apiBaseUrl}/Otp`;

  constructor(
    private http: HttpClient,
  ) { }

  generate(command: GenerateOtpCommand): Observable<string> {
    return this.http.post<string>(this.baseUrl, command, { responseType: 'text' as 'json' });
  }

}

