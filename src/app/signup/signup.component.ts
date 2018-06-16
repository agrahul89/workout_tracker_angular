import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { RestClientService } from '../rest-client.service';
import { SignupModel } from './signup-model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  registrationFailed = false;
  registrationMessage = '';
  registrationForm: SignupModel = new SignupModel('', '', '', '');

  validationPatterns = {
    'firstname': '^[a-zA-Z]{2,}$',
    'lastname': '^[a-zA-Z]{2,}$',
    'email': '^[a-z0-9_%$#\\.\\+\\-]{2,}@[a-zA-Z0-9\\-]{2,}\\.[a-z]{2,}$',
    'password': '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$\\-]).{8}$'
  };
  validPasswordRules = [
    'Password must be exactly 8 characters',
    'Password must contain one of #@$-',
    'Password must contain one uppercase letter',
    'Password must contain one lowercase letter',
    'Password must contain one number'
  ];

  constructor(private signupService: RestClientService) { }

  ngOnInit() {
    // this.registrationForm = new SignupModel('Rahul', 'Agarwal', 'rahul@agarwal.com', 'P@ssw0rd');
  }

  onSubmit() {
    if (this.emailExists(this.registrationForm.email)) {
      this.registrationFailed = true;
      this.registrationMessage = 'Sorry! Other user is already using provided email';
    } else {
      this.signupService.registerNewUser(this.registrationForm).subscribe(
        response => this.handleResponse(response),
        error => this.signupService.handleErrors(error),
        // complete => this.handleCompletion(complete)
      );
    }
  }

  handleCompletion(complete: any): void { }

  handleErrors(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      console.log(`Client error :: ${error.error.message}`);
    } else {
      console.log(`Server error [${error.status}]:: ${error.statusText}`);
      console.log(`Error Body : ${error.error}`);
    }
  }

  handleResponse(response: HttpResponse<Object>): void {
    const keys = response.headers.keys();
    const headers = keys.map(key => `${key} : ${response.headers.get(key)}`);
    headers.forEach(element => { console.log(element); });

    const status = response.status;
    this.registrationFailed = true;
    this.registrationMessage = 'Registration failed! Please try again';

    if (status === 201) {
      this.registrationFailed = false;
      this.registrationMessage = 'User was registered successfully';
    } else if (status === 200) {
      this.registrationFailed = false;
      this.registrationMessage = 'User was registered successfully';
      // TODO: Do something here for processing response body
    }
  }

  emailExists(email: String): boolean {
    let emailExists = true;
    this.signupService.searchEmail(email).subscribe(
      response => emailExists = response.status === 200 ? false : true,
      error => emailExists = error.status === 302 ? true : false,
    );
    return emailExists;
  }
}
