import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { SignupModel } from './signup-model';
import { equal } from 'assert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrationForm: SignupModel = new SignupModel('', '', '', '');
  validationPatterns = {
    'firstname': '^[a-zA-Z]{2,}$',
     'lastname': '^[a-zA-Z]{2,}$',
        'email': '^[a-z0-9_%$#\\.\\+\\-]{2,}@[a-zA-Z0-9\\-]{2,}\\.[a-z]{2,}$',
     'password': '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$\\-]).{8}$'
  };
  validPasswordRules = [
    'Password must be exactly 8 characters',
    'Password must contain one of #@$-',
    'Password must contain one uppercase letter',
    'Password must contain one lowercase letter',
    'Password must contain one number'
  ];

  constructor() { }

  ngOnInit() {
    // this.registrationForm = new SignupModel('Rahul', 'Agarwal', 'rahul@agarwal.com', 'P@ssw0rd');
  }

}
