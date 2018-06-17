import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SigninModel } from './signin-model';
import { AuthService } from '../auth.service';
import { ComponentBase } from '../base/base-component';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends ComponentBase {

  public signinForm: SigninModel = new SigninModel();

  constructor(private authService: AuthService, private router: Router) {
    super(authService);
    authService.resetAccess();
  }

  onSubmit(signinForm: SigninModel) {
    this.authService.signin(signinForm);
    this.isLoggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.signinForm.password = '';
        if (loggedIn) {
          this.signinForm = new SigninModel();
          this.router.navigate(['/category']);
        }
    });
  }

}
