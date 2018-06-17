import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { OnInit } from '@angular/core';

export class ComponentBase {

    private isLoggedIn: boolean;
    protected isLoggedIn$: Observable<boolean>;

    constructor(private authservice: AuthService) {
        this.isLoggedIn$ = this.authservice.isLoggedIn$;
        this.isLoggedIn$.subscribe(
            loggedIn => this.isLoggedIn = loggedIn
        );
    }

    get loggedIn(): boolean {
        return this.isLoggedIn;
    }

    signout() {
        this.authservice.signout();
    }
}
