import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { CcapiResult } from './../ccapiresult';
import { ClientAccount } from './client-account';

import { AdmUsersService } from './../adm/adm-users.service';

@Injectable()
export class ClientAccountService {
  apiUrl:string;

  clientAccountList:ClientAccount[];
  public clientAccountListSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);

  clientAccountsPerson:ClientAccount[];
  public clientAccountsPersonSubject:BehaviorSubject<ClientAccount[]> = new BehaviorSubject<ClientAccount[]>([]);

  clientAccount:ClientAccount;
  public clientAccountSubject:BehaviorSubject<ClientAccount> = new BehaviorSubject<ClientAccount>(new ClientAccount());

  constructor(private http:HttpClient
    , private admUserService: AdmUsersService) {
    this.apiUrl = 'http://ccapi.com//client/accounts';
    this.clientAccount = new ClientAccount();
    this.clientAccountsPerson = <ClientAccount[]>[];
    this.clientAccountList = <ClientAccount[]>[];
  }


  public getClientAccounts() {
    let url = this.apiUrl;
    this.clientAccountListSubject.next([]);
    return this.http.get<CcapiResult>(this.apiUrl
      , {headers: new HttpHeaders().set('Authorization', this.admUserService.authToken)}
      )
      .subscribe(
        resdata => {
          this.clientAccountList = resdata.data;
          console.log( ["ClientAccountService.getclientAccountList", this.clientAccountList, this.clientAccountList.length] );
          this.clientAccountListSubject.next(this.clientAccountList);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getClientAccountsPerson( client_id) {
    let url = this.apiUrl + '/person/'+client_id;
    this.clientAccountsPersonSubject.next([]);
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          this.clientAccountsPerson = resdata.data;
          console.log( ["ClientAccountService.getClientAccountsPerson", this.clientAccountsPerson, this.clientAccountsPerson.length] );
          this.clientAccountsPersonSubject.next(this.clientAccountsPerson);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getClientAccount( account_id) {
    let url = this.apiUrl + '/'+account_id;
    this.clientAccountSubject.next(null);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.clientAccount = resdata.data;
          console.log( ["ClientAccountService.getClientAccount", this.clientAccount] );
          this.clientAccountSubject.next(this.clientAccount);
        }
        , err => {
          console.log(err);
        }
      );
  }


  public postClientAccount(input ) {
    return this.http.post<CcapiResult>(this.apiUrl, input)
      .subscribe(
        resdata => {
          if( resdata.data) {
            this.clientAccount.set(resdata.data);
            console.log( ["1-postClientAccount", this.clientAccount]);
            this.clientAccountSubject.next(this.clientAccount);
          } else {
            console.log( ["resdata is null for ", resdata, input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public deleteClientAccount(input ) {
    return this.http.delete<CcapiResult>(this.apiUrl, input)
      .subscribe(
        resdata => {
          if( resdata['data']) {
            this.clientAccount.set(resdata['data']);
            console.log( ["1-deleteClientAccount", this.clientAccount]);
            this.clientAccountSubject.next(resdata['data']);
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
