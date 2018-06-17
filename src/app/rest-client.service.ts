import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { SignupComponent } from './signup/signup.component';
import { SignupModel } from './signup/signup-model';

@Injectable()
export class RestClientService {

  serviceBaseUrl: String = 'http://localhost:8080/tracker';
  registrationUrl: String = this.serviceBaseUrl + '/registration';

  constructor(private client: HttpClient) { }

  registerNewUser(signupForm: SignupModel) {
    return this.client.post(
      this.registrationUrl.toString(),
      JSON.stringify(signupForm),
      {
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
        },
        observe : 'response',
        reportProgress : false,
        responseType : 'json'
      }
    );
  }

  searchEmail(email: String) {
    const emailSearchUrl = this.registrationUrl + '/email/' + email + '/';
    return this.client.get(
      emailSearchUrl.toString(),
      {
        headers : {
          'Accept' : 'application/json',
      },
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
