import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {CcCompany} from './cc-company';
import {CcCards} from './cc-cards';
import 'rxjs/add/operator/map';

import {CcapiResult} from './../ccapiresult';

@Injectable()
export class CcCompanyService {
  apiBaseUrl: string;
  apiUrl:string;
  apiCardUrl:string;
  ccCompanyListCount: Number;
  ccCompanyList:CcCompany[];
  ccCompanyId: number;

  public ccCompanyListSubject:BehaviorSubject<CcCompany[]> = new BehaviorSubject<CcCompany[]>([]);
  public bDone: Subject<boolean> = new Subject();

  ccCompany:CcCompany;
  public ccCompanySubject:BehaviorSubject<CcCompany> = new BehaviorSubject<CcCompany>(null);

  ccCompanyCards: CcCards[];
  ccCard: CcCards;
  public ccCompanyCardsSubject:BehaviorSubject<CcCards[]> = new BehaviorSubject<CcCards[]>([]);
  public ccCardSubject:BehaviorSubject<CcCards> = new BehaviorSubject<CcCards>(null);

  constructor(private http:HttpClient) {

    this.apiBaseUrl = 'http://ccapi.com';
    this.apiUrl = this.apiBaseUrl+'/cc/company';
    this.apiCardUrl = this.apiBaseUrl+'/cc/cards';
    this.ccCompany = new CcCompany();
    this.ccCompanyList = <CcCompany[]>[];
    this.bDone = new Subject<boolean>();
    this.ccCompanyCards = <CcCards[]>[];
    this.ccCard = new CcCards();
    this.ccCompanyId = -1;
  }

  ngOnInit() {
    console.log( "CcCompany service init");
  }

  ngOnDestroy() {
    console.log( "CcCompany service destroy");
  }

  public getCompanyList( ) {
    this.ccCompanyListSubject.next(null);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.ccCompanyList = resdata.data;
          this.ccCompanyListCount = this.ccCompanyList.length;
          console.log( ["getCompanyList", this.ccCompanyList, this.ccCompanyList.length] );
          this.ccCompanyListSubject.next(this.ccCompanyList);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getCompany( cc_company_id) {
    console.log( ["getCompany", this.ccCompany]);
    if( !this.ccCompany ) {
      this.ccCompany = new CcCompany();
    }
    let url = this.apiUrl + '/'+cc_company_id;
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          console.log(resdata.data);
          this.ccCompany.set(resdata.data);
          //console.log( this.ccCompany);
          this.ccCompanySubject.next(this.ccCompany);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getCompanyCards( cc_company_id) {
    this.ccCompanyCardsSubject.next([]);
    let url = this.apiUrl + '/cards/'+cc_company_id;
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          this.ccCompanyCards  = resdata.data;
          console.log( ['service getCompanyCards', this.ccCompanyCards]);
          this.ccCompanyCardsSubject.next(resdata.data);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getCcCard( cc_card_id) {
    let url = this.apiCardUrl + '/'+ cc_card_id;
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          this.ccCard.set(resdata.data);
          this.ccCardSubject.next(resdata.data);
          console.log( ["service ccCard", this.ccCard]);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public postCompany(input ) {
    console.log( ["0-postCompany", input, this.ccCompany]);
    return this.http.post<CcapiResult>(this.apiUrl, input)
      .subscribe(
        resdata => {
          this.ccCompany.set(resdata.data);
          console.log( ["1-postCompany", this.ccCompany]);
          this.ccCompanySubject.next(this.ccCompany);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public postCcCard(input ) {
    console.log( ["0-postCcCard", input, this.ccCard]);
    return this.http.post<CcapiResult>(this.apiCardUrl, input)
      .subscribe(
        resdata => {
          this.ccCard.set(resdata.data);
          console.log( ["1-postCcCard", this.ccCard]);
          this.ccCardSubject.next(this.ccCard);
        }
        , err => {
          console.log(err);
        }
      );
  }

}
