import { Component, Input, OnChanges }       from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdmUser } from './../adm/adm-users';
import { AdmUsersService } from './../adm/adm-users.service'


const PWD_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{8,}$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnChanges {
  @Input()  admUser: AdmUser;

  loginForm: FormGroup;
  loginFormControl: FormControl;
  login: string;
  pwd: string;
  msg: string;
  bSuccess: boolean;

  constructor(
    private fb: FormBuilder
    , private admUserService: AdmUsersService
    , private router: Router
    ) {
    this.bSuccess = false;
    this.msg = "Please Login";
    this.admUser = new AdmUser();
    admUserService.admUserSubject.subscribe( result => {
      if( result) {
        this.admUser.set( result);
        this.bSuccess = true;
        this.msg = this.admUser.user_name + ' successfully logged in';
        let timeoutId = setTimeout(() => {
          this.msg = this.admUser.user_name + ' successfully logged in';
          router.navigate(['clients/accounts']);
        }, 1000);
        console.log(timeoutId );
      } else {
        this.msg = this.admUser.user_name + ' successfully logged in';

      }
    });
    this.loginFormControl = new FormControl('', [Validators.required, Validators.pattern(PWD_REGEX)]);
    this.admUser.login = 'dano';
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      login: '',
      pwd: ''
    });
  }

  ngOnChanges() {
    this.loginForm.reset({
      login: this.admUser.login,
      pwd: this.admUser.pwd
    });
  }

  onSubmit() {
    this.admUserService.login( this.loginForm.value);
  }

  revert() { this.ngOnChanges(); }
}
