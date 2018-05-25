import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestClientService {

  client: HttpClient;
  serviceBaseUrl: String = 'http://localhost:8080/tracker';
  regsitrationUrl: String = this.serviceBaseUrl + '/registration';

  constructor(httpClient: HttpClient) {
    this.client = httpClient;
   }

  registerNewUser() {
    this.client.post(this.regsitrationUrl.toString(), {}, {});
  }

}
