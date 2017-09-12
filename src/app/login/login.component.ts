import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder} from '@angular/forms';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AdmUser } from './../adm/adm-users';

const PWD_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{8,}$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnChanges {
  @Input()  admUser: AdmUser;

  loginFormGroup: FormGroup;
  loginFormControl: FormControl;

  constructor(
    private fb: FormBuilder
    ) {
    this.loginFormControl = new FormControl('', [Validators.required, Validators.pattern(PWD_REGEX)]);
    this.admUser = new AdmUser( {
      user_name: 'Van Gogh',
      login: '',
      pwd: ''
      });
    this.createForm();
  }

  createForm() {
    this.loginFormGroup = this.fb.group({
      user_name: this.admUser.user_name,
      login: '',
      pwd: ''
    });
  }

  ngOnChanges() {
    this.loginFormGroup.reset({
      username: this.admUser.user_name,
      login: this.admUser.login,
      pwd: this.admUser.pwd
    });
  }

  onSubmit() {
    console.log(this.loginFormGroup.get('login').value);
    console.log(this.loginFormGroup.get('pwd').value);
  }

  revert() { this.ngOnChanges(); }
}
