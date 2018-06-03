import { CategoryComponent } from './category/category.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin'},
  {path: 'signin',   component: SigninComponent},
  {path: 'signup',   component: SignupComponent},
  {path: 'workout',  component: WorkoutComponent},
  {path: 'category', component: CategoryComponent},
];

export const RoutingRoutes = RouterModule.forRoot(routes);
