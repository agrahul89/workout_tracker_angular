import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { WorkoutComponent } from './workout/workout.component';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  // TODO Implement Authentication/Routing Guard
  {path: '', pathMatch: 'full', redirectTo: 'signin'},
  {path: 'signin',   component: SigninComponent},
  {path: 'signup',   component: SignupComponent},
  {path: 'logout',   component: AppComponent},
  {path: 'category', component: CategoryComponent, canActivate: [AuthGuardService]},
  {path: 'workout',  component: WorkoutComponent,  canActivate: [AuthGuardService]},
];

export const RoutingRoutes = RouterModule.forRoot(routes);
