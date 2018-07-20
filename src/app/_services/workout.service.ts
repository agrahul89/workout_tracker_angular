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

  public static clone(workout: WorkoutModel): WorkoutModel {
    const category = new CategoryModel(workout.category.category, false, workout.category.id);
    return new WorkoutModel(workout.title, category, workout.note, workout.burnrate, false,
      workout.start, workout.end, workout.id);
  }

  public static copy(existing: WorkoutModel, updated: WorkoutModel): void {
    if (updated) {
      existing.editing = false;
      existing.id = updated.id;
      existing.end = updated.end;
      existing.note = updated.note;
      existing.title = updated.title;
      existing.start = updated.start;
      existing.burnrate = updated.burnrate;
      existing.notes = WorkoutService.createNotes(updated.note, updated.start, updated.end);
      if (updated.category) {
        existing.category.id = updated.category.id;
        existing.category.category = updated.category.category;
        existing.category.editing = false;
      }
    }
  }

  public static createNotes(note: string, start: Date, end: Date): string[] {
    const notes: string[] = [];
    if (note) { notes.push(note); }
    if (start) { notes.push(WorkoutService.getStartedAt(start)); }
    if (end) { notes.push(WorkoutService.getCompletedAt(end)); }
    return notes;
  }

  public static getFormatForDate(): string {
    return 'DD MMM YYYY';
  }

  public static getFormatForTime(): string {
    return 'HH:mm:ss';
  }

  public static getFormatForTimestamp(): string {
    return WorkoutService.getFormatForDate() + ' ' + WorkoutService.getFormatForTime();
  }

  public static getFormatForTimestampWithZone(): string {
    return WorkoutService.getFormatForDate() + ' ' + WorkoutService.getFormatForTime() + ' Z';
  }

  public static getCompletedAt(date: Date): string {
    const format = moment(date).isBefore(moment().startOf('day')) ?
    WorkoutService.getFormatForTimestamp() : WorkoutService.getFormatForTime();
    return `Completed@ ${moment(date).format(format)}`;
  }

  public static getStartedAt(date: Date): string {
    const format = moment(date).isBefore(moment().startOf('day')) ?
    WorkoutService.getFormatForTimestamp() : WorkoutService.getFormatForTime();
    return `Started@ ${moment(date).format(format)}`;
  }

  public create(workout: WorkoutModel, authToken: string) {
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

  public delete(id: number, authToken: string) {
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

  public getAll(authToken: string) {
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

  public update(workout: WorkoutModel, authToken: string) {
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
