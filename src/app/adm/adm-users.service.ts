import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './../utils/auth.service';
import {AdmUser} from './adm-users';
import {CcapiResult} from './../ccapiresult';

@Injectable()
export class AdmUsersService {
  apiUrl: string;
  admUserList:AdmUser[];
  public admUserListSubject:BehaviorSubject<AdmUser[]> = new BehaviorSubject<AdmUser[]>([]);
  public admUserSubject:BehaviorSubject<AdmUser> = new BehaviorSubject<AdmUser>(null);
  retVal: CcapiResult

  public admUser: AdmUser;
  public admUserChange:BehaviorSubject<AdmUser> = new BehaviorSubject<AdmUser>(new AdmUser());

  public authToken: string;

  constructor(private http:HttpClient
  , private authService:AuthService) {
    this.apiUrl = 'http://ccapi.com/admin/users';
    this.admUser = new AdmUser();
    this.admUserList = <AdmUser[]>[];
    this.authToken = null;
  }

  public login(input) {
    let myurl = this.apiUrl + '/login';
    const req = this.http.post<CcapiResult>( myurl, input)
    .subscribe(resp => {
        console.log(resp);
          if (resp.data) {
            this.admUser.set(resp.data);
            //  console.log( ["1-login", this.admUser]);
            this.authService.authTokenSubject.next(this.admUser.token);
            this.admUserSubject.next(this.admUser);
            localStorage.setItem('user', this.admUser.login);
          } else {
            console.log(["resdata is null for ", resp, input]);
          }
      }
      , err => {
        console.log(err);
      }
    );
  }

  public logout(input) {
    let myurl = this.apiUrl + '/logout';
    const req = this.http.post<CcapiResult>( myurl, input)
      .subscribe(
        resdata => {
          if( this.authService.getToken()) {
            this.authService.setToken(null);
          }
          if( this.admUser.user_id > 0) {
            this.admUser.clear();
            console.log( ["1-logout", this.admUser]);
            this.admUserSubject.next(this.admUser);
          }
          this.authService.authTokenRCSubject.next(9);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getAdmUserList( ) {
    this.admUserListSubject.next([]);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.admUserList = resdata.data;
          console.log( ["AdmUsersService.getAdmUserList", this.admUserList, this.admUserList.length] );
          this.admUserListSubject.next(this.admUserList);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getAdmUser( ) {
    return this.http.get<CcapiResult>(this.apiUrl
      , {headers: new HttpHeaders().set('Authorization', this.authToken)}
      )
      .subscribe(
        resdata => {
          this.admUser.set(resdata.data);
          console.log( ["AdmUsersService.getAdmUser", this.admUser] );
          this.admUserSubject.next(this.admUser);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public post(input) {
    const req = this.http.post<CcapiResult>( this.apiUrl, input)
      .subscribe(
        resdata => {
          if( resdata.data) {
            this.admUser.set(resdata.data);
            console.log( ["1-post admUser", this.admUser]);
            this.admUserSubject.next(this.admUser);
          } else {
            console.log( ["resdata is null for ", resdata, input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
    }

}
