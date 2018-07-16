import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';
import { RestClientService } from '../_services/rest-client.service';
import { WorkoutModel } from './workout-model';
import { CategoryModel } from '../category/category-model';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { WorkoutPlusComponent } from '../workout-plus/workout-plus.component';

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
    private router: Router,
    private modalService: NgbModal,
  ) { }

  static getFormatForDate(): string {
    return 'DD MMM YYYY';
  }

  static getFormatForTime(): string {
    return 'HH:mm:ss';
  }

  static getFormatForTimestamp(): string {
    return WorkoutComponent.getFormatForDate() + ' ' + WorkoutComponent.getFormatForTime();
  }

  static getFormatForTimestampWithZone(): string {
    return WorkoutComponent.getFormatForDate() + ' ' + WorkoutComponent.getFormatForTime() + ' Z';
  }

  static getCompletedAt(date: Date): string {
    const format = moment(date).isBefore(moment().startOf('day')) ?
      WorkoutComponent.getFormatForTimestamp() : WorkoutComponent.getFormatForTime();
    return `Completed@ ${moment(date).format(format)}`;
  }

  static getStartedAt(date: Date): string {
    const format = moment(date).isBefore(moment().startOf('day')) ?
      WorkoutComponent.getFormatForTimestamp() : WorkoutComponent.getFormatForTime();
    return `Started@ ${moment(date).format(format)}`;
  }

  ngOnInit() {
    this.retrieveAll(this.authService.auth);
    this.filterQuery$.pipe(
      debounceTime(400), distinctUntilChanged(),
      map(filterQuery => this.filter(filterQuery))
    ).subscribe();
  }

  private add(workout: WorkoutModel) {
    this.openTemplate('Add', null);
    if (workout) {
      // TODO: call service to add workout
      this.workouts.push(workout);
    } else {
      console.log('Invalid workout data :: ' + workout);
    }
  }

  private clone(workout: WorkoutModel): WorkoutModel {
    const category = new CategoryModel(workout.category.category, false, workout.category.id);
    return new WorkoutModel(workout.title, category, workout.note, workout.burnrate, false,
      workout.start, workout.end, [], workout.id);
  }

  private delete(workout: WorkoutModel) {
    const confirmed = confirm('Do you really want to delete this workout?');
    if (confirmed) {
      this.restService.deleteWorkout(workout.id, this.authService.auth).subscribe(
        res => {
          if (res.status === 200) {
            console.log(`Workout #${workout.id} deleted successfully`);
            this.workouts.splice(this.workouts.indexOf(workout), 1);
            alert(`Workout [${workout.title}] deleted successfully`);
          } else {
            console.log(`Workout [#${workout.title}] could not be deleted`);
          }
        },
        err => {
          if (err.status === 401 || err.status === 403) {
            console.log('Unauthorized access to workout');
          } else if (err.status === 400) {
            console.log('Non existing workout');
          }
          alert('Error deleting workout');
        },
        () => this.resetFilteredWorkouts()
      );
    }
  }

  private edit(workout: WorkoutModel) {
    workout.editing = true;
    this.openTemplate('Update', workout);
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
        const query = filterQuery ? filterQuery.trim().toLocaleLowerCase() : '';
        const title = workout.title ? workout.title.trim().toLocaleLowerCase() : '';
        if (title.indexOf(query) !== -1) {
          this.filteredWorkouts.push(workout);
        }
      }
    );
  }

  private openTemplate(action: string, workout?: WorkoutModel) {
    const modalRef = this.modalService.open(WorkoutPlusComponent, { centered: true, size: 'sm' });
    modalRef.componentInstance.action = action;
    if (workout) {
      modalRef.componentInstance.workout = workout;
    }
    modalRef.result.then(
      result => alert(`Closed result :: ${result}`),
      reason => alert(`Closed reason :: ${reason}`),
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
        if (res.status === 200 && res.body) {
          Array.from(res.body).forEach((workout: WorkoutModel) => {
            this.workouts.push(this.clone(workout));
          });
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
    if (workout && workout.title && workout.category && workout.category.category) {
      this.restService.updateWorkout(workout, this.authService.auth).subscribe(
        res => {
          if (res.status === 200) {
            console.log(`Workout #${workout.id} updated successfully`);
            this.workouts.splice(this.workouts.indexOf(workout), 1);
            this.workouts.push(this.clone(res.body));
            alert(`Workout #${workout.id} updated successfully`);
          } else if (res.status === 204) {
            alert('Workout is not available in database');
          } else {
            console.log(`Workout #${workout.id} could not be updated`);
          }
        },
        err => {
          if (err.status === 401 || err.status === 403) {
            console.log('Unauthorized access to workouts');
          }
          alert(`Error updating workout #${workout.id}`);
          if (err.error) {
            err.error.messages.forEach(error => {
              console.log(error);
            });
          }
        },
        () => workout.editing = false
      );
    }
  }

}
