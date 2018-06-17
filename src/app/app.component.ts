import { Component } from '@angular/core';
import { ComponentBase } from './base/base-component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ComponentBase {

  title = 'Workout Tracker';
  constructor(service: AuthService) {
    super(service);
  }

}
