import { Component, Input, OnChanges, OnDestroy }       from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ISubscription} from "rxjs/Subscription";

import { AdmUser } from './../adm/adm-users';
import { AdmUsersService } from './../adm/adm-users.service'
import {AuthService} from "../utils/auth.service";


const PWD_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{8,}$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnChanges {
  @Input()  admUser:AdmUser;

  loginForm:FormGroup;
  loginFormControl:FormControl;
  login:string;
  pwd:string;
  msg:string;
  bSuccess:boolean;
  admServiceSub:ISubscription;
  authServiceSub:ISubscription;

  constructor(private fb:FormBuilder
    , private admUserService:AdmUsersService
    , private authService:AuthService
    , private router:Router) {
    this.bSuccess = false;
    this.msg = "Please Login";
    this.admUser = new AdmUser();
    this.admUser.login = localStorage.getItem('user');
    this.loginFormControl = new FormControl('', [Validators.required, Validators.pattern(PWD_REGEX)]);
    this.admServiceSub = null;
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      login: this.admUser.login,
      pwd: new FormControl(this.admUser.pwd
        , [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
      )
    });
  }

  ngOnInit() {
    this.admServiceSub = this.admUserService.admUserSubject.subscribe(result => {
      console.log(result);
      this.admUser.set(result);
      if (result && result.user_id > 0) {
        this.admUser.set(result);
        if (this.authService.getToken()) {
          this.bSuccess = true;
          this.msg = this.admUser.user_name + ' successfully logged in';
          let timeoutId = setTimeout(() => {
            this.router.navigate(['clients/accounts']);
          }, 1500);
        } else {
          this.bSuccess = false;
          this.msg = this.admUser.login + ': invalid user / password';
        }
      } else {
        if (this.admUser.user_name) {
          this.msg = this.admUser.user_name + ' invalid user / password';
        } else {
          this.msg = 'Please login';
        }
      }
    });
    this.authServiceSub = this.authServiceSub = this.authService.authTokenSubject.subscribe(tok => {
      if (tok) {
        this.authService.setToken(tok);
//        this.router.navigate(['clients/accounts']);
      }
    })

  }

  ngOnChanges() {
    this.loginForm.reset({
      login: this.admUser.login,
      pwd: this.admUser.pwd
    });
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      console.log([this.loginForm.status, this.loginForm.valid]);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('login call');
      this.admUserService.login(this.loginForm.value);
    }
  }

  revert() {
    this.ngOnChanges();
  }

  ngOnDestroy() {
    this.admServiceSub.unsubscribe();
    this.authServiceSub.unsubscribe();
  }
}
