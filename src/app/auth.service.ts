import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, last, take, takeLast } from 'rxjs/operators';

import { SigninModel } from './signin/signin-model';
import { ServiceBase } from './base/base-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceBase implements CanActivate {

  private static PUBLIC_HOME: String = '/';
  private static SECURE_HOME: String = '/category';

  private authToken: String;
  private signinUrl: String = this.baseUrl + '/login';
  private logOutUrl: String = this.baseUrl + '/logout';
  private authenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private restclient: HttpClient, private router: Router) {
    super(restclient);
  }

  get auth(): string {
    return this.authToken.valueOf();
  }

  static get publicHome(): string {
    return AuthService.PUBLIC_HOME.valueOf();
  }

  static get secureHome(): string {
    return AuthService.SECURE_HOME.valueOf();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  private resetAuthToken() {
    this.authToken = null;
  }

  signin(signinForm: SigninModel): void {
    this.restclient.post(
      this.signinUrl.toString(), JSON.stringify(signinForm),
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        observe: 'response', reportProgress: false, responseType: 'json'
      }
    ).subscribe(
      res => this.handleSignInResponse(res),
      err => this.handleSignInError(err)
    );
  }

  signout(): void {
    this.restclient.post(
      this.logOutUrl.toString(), null,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        observe: 'response', reportProgress: false, responseType: 'json'
      });
    this.resetAuthToken();
    this.authenticated$.next(false);
  }

  /* TODO: use AuthGuard implementation */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated().pipe(
      takeLast(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate([AuthService.publicHome]);
          return false;
        } else {
          this.router.navigate([AuthService.secureHome]);
          return true;
        }
      })
    );
  }

  private handleSignInError(error: HttpErrorResponse): void {
    console.log('Authorization error :' + error.status);
    if (error.status && (error.status === 401 || error.status === 403)) {
      console.log('Unauthorized access denied');
      console.log('Login Failed :' + error.status);
    }
    this.authenticated$.next(false);
  }

  private handleSignInResponse(response: HttpResponse<SigninModel>): void {
    const status = response.status;
    const keys = response.headers.keys();
    const headers = keys.map(key => `${key} : ${response.headers.get(key)}`);

    if (status === 200 && response.body) {
      const output: SigninModel = response.body;
      this.authToken = String(output.authToken);
      console.log('Login Passed :' + status);
      this.authenticated$.next(true);
    } else {
      this.authenticated$.next(false);
      console.log('Login Failed :' + status);
    }
  }

}
