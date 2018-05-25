import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'signin'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

export const RoutingRoutes = RouterModule.forRoot(routes);
