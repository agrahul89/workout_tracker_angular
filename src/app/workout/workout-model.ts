export class WorkoutModel {

    constructor(
        public workout: string,
        public category: string,
        public note: string,
        public burnrate: number,
        public editing: boolean = false,
        public start?: Date,
        public end?: Date,
        private notes?: string[],
    ) {
        this.notes = [];
        if (note !== null || note !== undefined || note !== '') {
            this.notes.push(note);
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
