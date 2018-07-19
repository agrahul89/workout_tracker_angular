import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { ServiceBase } from '../_base/base-service';
import { CategoryModel } from '../category/category-model';
import { SignupModel } from '../signup/signup-model';
import { WorkoutModel } from '../workout/workout-model';


@Injectable()
export class RestClientService extends ServiceBase {

  private categoryUrl: String = this.baseUrl + '/category';
  private   signupUrl: String = this.baseUrl + '/registration';
  private  workoutUrl: String = this.baseUrl + '/workout';

  constructor(private client: HttpClient) {
    super(client);
  }

  createCategory(category: string, authToken: string) {
    return this.client.post(
      this.categoryUrl.toString(),
      `{"category" : "${category}"}`,
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

  createWorkout(workout: WorkoutModel, authToken: string) {
    return this.client.post(
      this.workoutUrl.toString(),
      JSON.stringify(workout),
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

  deleteWorkout(id: number, authToken: string) {
    return this.client.delete(
      `${this.workoutUrl.toString()}/${id}`,
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

  getWorkouts(authToken: string) {
    return this.client.get<WorkoutModel[]>(
      this.workoutUrl.toString(),
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

  updateCategory(category: CategoryModel, authToken: string) {
    return this.client.put<CategoryModel>(
      `${this.categoryUrl.toString()}/${category.id}`,
      `{"id" : "${category.id}", "category" : "${category.category}"}`,
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

  updateWorkout(workout: WorkoutModel, authToken: string) {
    return this.client.put<WorkoutModel>(
      `${this.workoutUrl.toString()}/${workout.id}`,
      JSON.stringify(workout),
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

}
