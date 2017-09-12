import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AdmUser} from './adm-users';

@Injectable()
export class AdmUsersService {
  apiUrl: string;
  admUserList:AdmUser[];
  public admUserListChange:BehaviorSubject<AdmUser[]> = new BehaviorSubject<AdmUser[]>([]);
  public loadDone: Subject<boolean> = new Subject();

  public admUser: AdmUser;
  public admUserChange:BehaviorSubject<AdmUser> = new BehaviorSubject<AdmUser>(new AdmUser());
  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com/admin/users';
    this.admUser = new AdmUser();
    this.admUserList = <AdmUser[]>[];
    this.loadDone = new Subject<boolean>();
  }

  login() {
    let url = this.apiUrl;
    return this.http.get(url);
  }


}
