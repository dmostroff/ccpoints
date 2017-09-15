import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {CcCompany} from './cc-company';
import 'rxjs/add/operator/map';

import {CcapiResult} from './../ccapiresult';

@Injectable()
export class CcCompanyService {

  apiUrl:string;
  ccCompanyListCount: Number;
  ccCompanyList:CcCompany[];

  public CcCompanysListChange:BehaviorSubject<CcCompany[]> = new BehaviorSubject<CcCompany[]>([]);
  public bDone: Subject<boolean> = new Subject();

  ccCompany:CcCompany;
  public CcCompanySubject:BehaviorSubject<CcCompany> = new BehaviorSubject<CcCompany>(new CcCompany());

  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com/client/CcCompany';
    this.ccCompany = new CcCompany();
    this.ccCompanyList = <CcCompany[]>[];
    this.bDone = new Subject<boolean>();
  }

  ngOnInit() {
    console.log( "CcCompany service init");
  }
  ngOnDestroy() {
    console.log( "CcCompany service destroy");
  }

  public loadList( ) {
    this.bDone.next(false);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.ccCompanyList = resdata.data;
          this.ccCompanyListCount = this.ccCompanyList.length;
          console.log( [this.ccCompanyList, this.ccCompanyList.length] );
          this.bDone.next(true);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public load( ) {
    this.bDone.next(false);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.ccCompany.set(resdata.data);
          console.log( this.ccCompany);
          this.bDone.next(true);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public post(input ) {
    this.bDone.next(false);
    return this.http.post<CcapiResult>(this.apiUrl, input)
      .subscribe(
        resdata => {
          this.ccCompany = resdata.data;
          console.log( this.ccCompany);
          this.bDone.next(true);
        }
        , err => {
          console.log(err);
        }
      );
  }

}