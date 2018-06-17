import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingRoutes } from './routing.routing';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RestClientService } from './rest-client.service';
import { PublicNavComponent } from './public-nav/public-nav.component';
import { SecureNavComponent } from './secure-nav/secure-nav.component';
import { WorkoutComponent } from './workout/workout.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicNavComponent,
    SecureNavComponent,
    SigninComponent,
    SignupComponent,
    WorkoutComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingRoutes,
  ],
  providers: [
    RestClientService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
