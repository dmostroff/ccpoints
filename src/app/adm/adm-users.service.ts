import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AdmUser} from './adm-users';
import {CcapiResult} from './../ccapiresult';

@Injectable()
export class AdmUsersService {
  apiUrl: string;
  admUserList:AdmUser[];
  public admUserListChange:BehaviorSubject<AdmUser[]> = new BehaviorSubject<AdmUser[]>([]);
  public loadDone: Subject<boolean> = new Subject();
  retVal: CcapiResult

  public admUser: AdmUser;
  public admUserChange:BehaviorSubject<AdmUser> = new BehaviorSubject<AdmUser>(new AdmUser());
  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com/admin/users';
    this.admUser = new AdmUser();
    this.admUserList = <AdmUser[]>[];
    this.loadDone = new Subject<boolean>();
  }

  public login(logininput) {
    this.loadDone.next(false);
    let myurl = this.apiUrl + '/login';
    const req = this.http.post( myurl, logininput)
      .subscribe(
      res => {
        this.retVal = <CcapiResult>res;
        this.loadDone.next(true);
      }
      , err => {
        console.log( err);
      }
      );
  }

  public post() {
    let url = this.apiUrl;
    const req = this.http.post(this.apiUrl, {
        user_id: this.admUser.user_id,
        login: this.admUser.login,
        pwd: this.admUser.pwd,
        user_name: this.admUser.user_name,
        email: this.admUser.email,
        phone: this.admUser.phone,
        phone_2: this.admUser.phone_2,
        phone_cell: this.admUser.phone_cell,
        phone_fax: this.admUser.phone_fax
      }
    ).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    }

}
