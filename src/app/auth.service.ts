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
export class AuthService extends ServiceBase implements CanActivate, OnInit {

  private static AUTH_TOKEN: String;
  private signinUrl: String = this.baseUrl + '/login';
  private logOutUrl: String = this.baseUrl + '/logout';
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private restclient: HttpClient, private router: Router) {
    super(restclient);
  }

  ngOnInit() {
    // this.loggedIn$.next(false);
  }

  get auth(): string {
    return AuthService.AUTH_TOKEN.toString();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  resetAccess() {
    this.loggedIn$.next(false);
    this.router.navigate(['/']);
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
    this.resetAccess();
    // TODO: implement signout()
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      takeLast(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        } else {
          this.router.navigate(['/category']);
          return true;
        }
      })
    );
  }

  private handleSignInError(error: HttpErrorResponse): void {
    if (error.status && (error.status === 401 || error.status === 403)) {
      this.loggedIn$.next(false);
      this.router.navigate(['/']);
    }
    console.log('Login Failed :' + error.status);
    this.loggedIn$.next(false);
  }

  private handleSignInResponse(response: HttpResponse<SigninModel>): void {
    const status = response.status;
    const keys = response.headers.keys();
    const headers = keys.map(key => `${key} : ${response.headers.get(key)}`);

    if (status === 200 && response.body) {
      const output: SigninModel = response.body;
      AuthService.AUTH_TOKEN = output.authToken;
      this.loggedIn$.next(true);
      console.log('Login Passed :' + status);
    } else {
      this.loggedIn$.next(false);
      console.log('Login Failed :' + status);
    }
  }

}
