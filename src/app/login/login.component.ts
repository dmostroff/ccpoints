import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder} from '@angular/forms';
import {FormGroup, FormControl, Validators} from '@angular/forms';
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

  constructor(
    private fb: FormBuilder
    , private admUserService: AdmUsersService
    ) {
    this.loginFormControl = new FormControl('', [Validators.required, Validators.pattern(PWD_REGEX)]);
    this.admUser = admUserService.admUser;
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
    console.log(this.loginForm.value);
    this.admUserService.login( this.loginForm.value);
    this.admUserService.loadDone.subscribe(isDone => { if(isDone) {  this.admUser = this.admUserService.admUser; console.log(this.admUser); }});
  }

  revert() { this.ngOnChanges(); }
}
