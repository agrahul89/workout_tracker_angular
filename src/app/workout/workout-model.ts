import * as moment from 'moment';
import { WorkoutComponent } from './workout.component';
import { CategoryModel } from '../category/category-model';

export class WorkoutModel {

    constructor(
        public workout: string,
        public category: CategoryModel,
        public note: string,
        public burnrate: number,
        public editing: boolean = false,
        public start?: Date,
        public end?: Date,
        private notes?: string[],
        private id?: number,
    ) {
        this.notes = [];
        if (note !== null || note !== undefined || note !== '') {
            this.notes.push(note);
        }
        if (start !== null || start !== undefined) {
            this.notes.push(WorkoutComponent.getStartedAt(start));
        }
        if (end !== null || end !== undefined) {
            this.notes.push(WorkoutComponent.getCompletedAt(end));
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

    getNotes(): string[] {
        return this.notes;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
