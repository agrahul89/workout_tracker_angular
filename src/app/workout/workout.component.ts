import { WorkoutModel } from './workout-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  private workouts: WorkoutModel[] = [
    new WorkoutModel('15-min Sit-up', 'Sit-up', 'some descriptive text statement', 2.0),
    new WorkoutModel('30-min Walk', 'Walk', 'hmm', 1.0),
    new WorkoutModel('10-min Swim', 'Swim', 'some description', 3.0),
    new WorkoutModel('10-min Jog', 'Jog', 'some description', 1.5),
  ];

  filteredWorkouts: WorkoutModel[];

  constructor() { }

  ngOnInit() {
    // TODO: Load all workouts from service
    this.filteredWorkouts = this.workouts;
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
    workout.note = workout.note + '<br><b>Completed</b> : ' + workout.end;
    this.update(workout);
  }

  private filter(filterQuery: String): WorkoutModel[] {
    console.log(filterQuery);
    if (filterQuery !== null && filterQuery !== undefined && filterQuery.trim() !== '') {
      // TODO: filter categories list and return
    }
    return this.filteredWorkouts;
  }

  private start(workout: WorkoutModel) {
    workout.start = new Date();
    workout.note = workout.note + '<br><b>Started</b> : ' + workout.start;
    this.update(workout);
  }

  private update(workout: WorkoutModel) {
    // TODO: call service to update workout
    workout.editing = false;
  }

}
