import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { SignupModel } from './signup/signup-model';
import { ServiceBase } from './base/base-service';
import { CategoryModel } from './category/category-model';

@Injectable()
export class RestClientService extends ServiceBase {

  private categoryUrl: String = this.baseUrl + '/category';
  private signupUrl: String = this.baseUrl + '/registration';
  private workoutUrl: String = this.baseUrl + '/workout';

  constructor(private client: HttpClient) {
    super(client);
  }

  deleteCategory(id: number, authToken: string) {
    return this.client.delete(
      `${this.categoryUrl.toString()}/${id}`,
      {
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : authToken
        },
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    );
  }

  getCategories(authToken: string) {
    return this.client.get<CategoryModel[]>(
      this.categoryUrl.toString(),
      {
        headers: {
          'Accept' : 'application/json',
          'Authorization' : authToken
        },
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    );
  }

  registerNewUser(signupForm: SignupModel) {
    return this.client.post(
      this.signupUrl.toString(),
      JSON.stringify(signupForm),
      {
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
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
          'Accept' : 'application/json',
        },
        observe: 'response',
        reportProgress: false,
        responseType: 'json'
      }
    );
  }

}
