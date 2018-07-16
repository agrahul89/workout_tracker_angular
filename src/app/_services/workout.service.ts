import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

constructor() { }

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

}
