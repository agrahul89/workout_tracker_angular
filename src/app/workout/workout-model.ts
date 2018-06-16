export class WorkoutModel {

    constructor(
        public workout: string,
        public category: string,
        public note: string,
        public burnrate: number,
        public editing: boolean = false,
        public start?: Date,
        public end?: Date,
    ) { }

    toString(): string {
        return JSON.stringify(this);
    }
}
