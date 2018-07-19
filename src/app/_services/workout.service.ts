import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { CategoryModel } from '../category/category-model';
import { WorkoutModel } from '../workout/workout-model';
import { ServiceBase } from '../_base/base-service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService extends ServiceBase {

  private  workoutUrl: String = this.baseUrl + '/workout';

  constructor(private client: HttpClient) {
    super(client);
  }

  static clone(workout: WorkoutModel): WorkoutModel {
    const category = new CategoryModel(workout.category.category, false, workout.category.id);
    return new WorkoutModel(workout.title, category, workout.note, workout.burnrate, false,
      workout.start, workout.end, [], workout.id);
  }

  static getFormatForDate(): string {
    return 'DD MMM YYYY';
  }

  static getFormatForTime(): string {
    return 'HH:mm:ss';
  }

  static getFormatForTimestamp(): string {
    return WorkoutService.getFormatForDate() + ' ' + WorkoutService.getFormatForTime();
  }

  static getFormatForTimestampWithZone(): string {
    return WorkoutService.getFormatForDate() + ' ' + WorkoutService.getFormatForTime() + ' Z';
  }

  static getCompletedAt(date: Date): string {
    const format = moment(date).isBefore(moment().startOf('day')) ?
    WorkoutService.getFormatForTimestamp() : WorkoutService.getFormatForTime();
    return `Completed@ ${moment(date).format(format)}`;
  }

  static getStartedAt(date: Date): string {
    const format = moment(date).isBefore(moment().startOf('day')) ?
    WorkoutService.getFormatForTimestamp() : WorkoutService.getFormatForTime();
    return `Started@ ${moment(date).format(format)}`;
  }

  create(workout: WorkoutModel, authToken: string) {
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

  delete(id: number, authToken: string) {
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

  getAll(authToken: string) {
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

  update(workout: WorkoutModel, authToken: string) {
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
