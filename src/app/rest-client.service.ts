import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { SignupComponent } from './signup/signup.component';
import { SignupModel } from './signup/signup-model';

@Injectable()
export class RestClientService {

  serviceBaseUrl: String = 'http://localhost:8080/tracker';
  regsitrationUrl: String = this.serviceBaseUrl + '/registration';

  constructor(private client: HttpClient) { }

  registerNewUser(signupForm: SignupModel) {
    return this.client.post(
      this.regsitrationUrl.toString(),
      JSON.stringify(signupForm),
      {
        headers : {'Content-Type' : 'application/json'},
        observe : 'response',
        reportProgress : false,
        responseType : 'json'
      }
    );
  }

  handleErrors(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log(`Client error :: ${error.error.message}`);
    } else {
      console.log(`Server error [${error.status}]:: ${error.statusText}`);
      console.log(`Error Body : ${error.error}`);
    }
    return throwError(error);
  }

}
