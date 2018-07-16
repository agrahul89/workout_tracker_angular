import { CategoryModel } from '../category/category-model';
import { WorkoutService } from '../_services/workout.service';

export class WorkoutModel {

    constructor(
        public title: string,
        public category: CategoryModel,
        public note: string,
        public burnrate: number,
        public editing: boolean = false,
        public start?: Date,
        public end?: Date,
        public notes?: string[],
        public id?: number,
    ) {
        this.notes = [];
        if (note) {
            this.notes.push(note);
        }
        if (start) {
            this.notes.push(WorkoutService.getStartedAt(start));
        }
        if (end) {
            this.notes.push(WorkoutService.getCompletedAt(end));
        }
    }

    addNote(note: string): void {
        this.notes.push(note);
    }

    removeNote(note: string): void {
        const index = this.notes.indexOf(note);
        if (index > -1) {
            this.notes.splice(index, 1);
        }
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
