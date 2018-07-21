import { WorkoutModel } from '../workout/workout-model';

export class ChartModel {
    constructor(
        public range: string,
        public burntCalories:  number,
        public workouts: WorkoutModel[]
    ) {

    }
}
