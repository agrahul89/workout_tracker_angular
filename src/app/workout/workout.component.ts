import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { RestClientService } from '../rest-client.service';
import { WorkoutModel } from './workout-model';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  private workouts: WorkoutModel[] = [];
  filteredWorkouts: WorkoutModel[] = [];
  filterQuery$ = new Subject<string>();

  constructor(
    private authService: AuthService,
    private restService: RestClientService,
    private router: Router) { }

  static getFormatForDate(): string {
    return 'DD MMM YYYY';
  }

  static getFormatForTime(): string {
    return 'HH:mm:ss';
  }

  static getFormatForTimestamp(): string {
    return this.getFormatForDate() + ' ' + this.getFormatForTime();
  }

  static getStartedAt(date: Date): string {
      return `Started@ ${moment(date).format(WorkoutComponent.getFormatForTime())}`;
  }

  static getCompletedAt(date: Date): string {
      return `Completed@ ${moment(date).format(WorkoutComponent.getFormatForTime())}`;
  }

  ngOnInit() {
    this.retrieveAll(this.authService.auth);
    this.filterQuery$.pipe(
      debounceTime(400), distinctUntilChanged(),
      map(filterQuery => this.filter(filterQuery))
    ).subscribe();
  }

  private getFormatForTimestampWithZone(): string {
    return WorkoutComponent.getFormatForDate() + ' ' + WorkoutComponent.getFormatForTime() + ' Z';
  }

  private add(workout: WorkoutModel) {
    if (workout === undefined || workout === null) {
      console.log('Invalid workout data :: ' + workout);
    } else {
      // TODO: call service to add workout
      this.workouts.push(workout);
    }
  }

  private delete(workout: WorkoutModel) {
    // TODO: call service to delete workout
    const index: number = this.workouts.indexOf(workout);
    if (index !== -1) {
        this.workouts.splice(index, 1);
    }
    console.log(this.workouts.length);
  }

  private edit(workout: WorkoutModel) {
    workout.editing = true;
  }

  private end(workout: WorkoutModel) {
    workout.end = new Date();
    workout.addNote(WorkoutComponent.getCompletedAt(workout.end));
    this.update(workout);
  }

  private filter(filterQuery: String): void {
    this.filteredWorkouts.length = 0;
    this.workouts.forEach(
      (workout: WorkoutModel) => {
        const query = filterQuery === null || filterQuery === undefined
          ? '' : filterQuery.trim().toLocaleLowerCase();
        const workoutName = workout.workout === null || workout.workout === undefined
          ? '' : workout.workout.trim().toLocaleLowerCase();
        if (workoutName.startsWith(query)) {
          this.filteredWorkouts.push(workout);
        }
      }
    );
  }

  private resetFilteredWorkouts() {
    this.filteredWorkouts.length = 0;
    this.workouts.forEach(workout => {
      this.filteredWorkouts.push(workout);
    });
  }

  private retrieveAll(authToken: string): void {
    this.restService.getWorkouts(authToken).subscribe(
      res => {
        // TODO: fix model data assignment
        if (res.status === 200 && res.body) {
          this.workouts = res.body;
        } else if (res.status === 204) {
          console.log('No workouts found');
          this.workouts.length = 0;
        }
      },
      err => {
        if (err.status === 401 || err.status === 403) {
          console.log('Unauthorized access to workout');
          this.workouts.length = 0;
        }
        alert('Error accessing workouts');
      },
      () => this.resetFilteredWorkouts()
    );
  }

  private start(workout: WorkoutModel) {
    workout.start = new Date();
    workout.addNote(WorkoutComponent.getStartedAt(workout.start));
    this.update(workout);
  }

  private update(workout: WorkoutModel) {
    // TODO: call service to update workout
    workout.editing = false;
  }

}
