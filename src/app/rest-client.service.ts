import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { SignupModel } from './signup/signup-model';
import { ServiceBase } from './base/base-service';

@Injectable()
export class RestClientService extends ServiceBase {

  private signupUrl: String = this.baseUrl + '/registration';

  constructor(private client: HttpClient) {
    super(client);
  }

  registerNewUser(signupForm: SignupModel) {
    return this.client.post(
      this.signupUrl.toString(),
      JSON.stringify(signupForm),
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    );
  }

  searchEmail(email: String) {
    const emailSearchUrl = this.signupUrl + '/email/' + email + '/';
    return this.client.get(
      emailSearchUrl.toString(),
      {
        headers: {
          'Accept': 'application/json',
        },
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    );
  }

}
