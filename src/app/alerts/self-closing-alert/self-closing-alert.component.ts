import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-self-closing-alert',
  template: `
  <ngb-alert [dismissible]='true' (close)='close()' *ngIf='visible'>
    <small>{{message}}</small>
  </ngb-alert>`,
})
export class SelfClosingAlertComponent implements OnInit {

  private alert = new Subject<String>();
  protected message: string;
  protected visible = true;

  constructor() { }

  ngOnInit() {
    this.alert.pipe(
      debounceTime(5000)
    ).subscribe(
      message => {
        this.message = message.valueOf();
        this.visible = !(!message);
      }
    );

  }

  close(): void {
    this.alert.next(null);
  }

  show(message: string): void {
    if (message) {
      this.alert.next(message);
    }
  }

}
