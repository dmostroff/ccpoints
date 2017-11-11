import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { CcapiResult } from './../ccapiresult';
import { ClientAccount } from './client-account';

import { AdmUsersService } from './../adm/adm-users.service';
import { AuthService } from './../utils/auth.service';

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
    , private admUsersService: AdmUsersService
    , private authService: AuthService
  ) {
    this.apiUrl = 'http://ccapi.com//client/accounts';
    this.clientAccount = new ClientAccount();
    this.clientAccountsPerson = <ClientAccount[]>[];
    this.clientAccountList = <ClientAccount[]>[];
  }


  public getClientAccounts() {
    let url = this.apiUrl;
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          if( resdata.res.rc != 0) {
            this.authService.authTokenRCSubject.next(resdata.res.rc);
          } else {
            if( resdata.data && resdata.data.length > 0) {
              this.clientAccountList = resdata.data;
              console.log(["ClientAccountService.getclientAccountList", this.clientAccountList, 'j']);
              this.clientAccountListSubject.next(this.clientAccountList);
            }
          }
        }
      , (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
          //, err => {
          //  if( err.status == 401) {
          //    console.log( err.status);
          //    return this.authService.authTokenRCSubject.next(-1);
          //  }
          //  console.log(err);
          //}
        }
      );
  }

  public getClientAccountsPerson( client_id) {
    let url = this.apiUrl + '/person/'+client_id;
    return this.http.get<CcapiResult>(url)
      .subscribe(
        resdata => {
          if( resdata.res.rc != 0) {
            this.authService.authTokenRCSubject.next(resdata.res.rc);
          } else {
            this.clientAccountsPerson = resdata.data;
            console.log( ["ClientAccountService.getClientAccountsPerson", this.clientAccountsPerson, this.clientAccountsPerson.length] );
            this.clientAccountsPersonSubject.next(this.clientAccountsPerson);
          }
        }
        , err => {
          console.log(err);
          this.authService.authTokenRCSubject.next(-1);
        }
      );
  }

  public getClientAccount( account_id) {
    let url = this.apiUrl + '/'+account_id;
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          console.log( [resdata, 'getClientAccount']);
          if( resdata.res.rc != 0) {
            this.authService.authTokenRCSubject.next(resdata.res.rc);
          } else {
            this.clientAccount = resdata.data;
            console.log(["ClientAccountService.getClientAccount", this.clientAccount]);
            this.clientAccountSubject.next(this.clientAccount);
          }
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
          if( resdata.res.rc != 0) {
            this.authService.authTokenRCSubject.next(resdata.res.rc);
          } else {
            if (resdata.data) {
              this.clientAccount.set(resdata.data);
              console.log(["1-postClientAccount", this.clientAccount]);
              this.clientAccountSubject.next(this.clientAccount);
            } else {
              console.log(["resdata is null for ", resdata, input]);
            }
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
          //if( resdata.res.rc != 0) {
          //  this.authService.authTokenSubject.next(resdata.res.rc);
          //} else {
          //  if (resdata.data) {
          //    this.clientAccount.set(resdata['data']);
          //    console.log( ["1-deleteClientAccount", this.clientAccount]);
          //    this.clientAccountSubject.next(resdata['data']);
          //  } else {
          //    console.log( ["resdata is null for ", resdata, input]);
          //  }
          //}
        }
        , err => {
          console.log(err);
        }
      );
  }

}
