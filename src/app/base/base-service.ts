import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class ServiceBase {

    baseUrl: String = 'http://localhost:8080/tracker';

    constructor(private httpclient: HttpClient) { }

    handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
        console.log(`Client error :: ${error.error.message}`);
        } else {
        console.log(`Server error [${error.status}]:: ${error.statusText}`);
        console.log(`Error Body : ${error.error}`);
        }
        return throwError(error);
    }
}
