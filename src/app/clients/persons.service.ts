import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ClientPerson} from './clientperson';
import 'rxjs/add/operator/map';

import {CcapiResult} from './../ccapiresult';

@Injectable()
export class PersonsService {

  apiUrl:string;
  personListCount: Number;

  personList:ClientPerson[];
  public personsListSubject:BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);
  public personsPageSubject:BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);

  person:ClientPerson;
  public personSubject:BehaviorSubject<ClientPerson> = new BehaviorSubject<ClientPerson>(new ClientPerson());

  public personShowModeSubject:BehaviorSubject<boolean[]> = new BehaviorSubject<boolean[]>([]);

  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com/client/person';
    this.person = new ClientPerson();
    this.personList = <ClientPerson[]>[];
  }

  ngOnInit() {
    console.log( "person service init");
  }
  ngOnDestroy() {
    console.log( "person service destroy");
  }

  public getHubUsers() {
    let url = 'https://api.github.com/users/jonuts';
    return this.http.get(url)
  }

  public getPersonList( ) {
    this.personsListSubject.next([]);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.personList = resdata.data;
          this.personListCount = this.personList.length;
          console.log( ["personService.getPersonList", this.personList, this.personList.length] );
          this.personsListSubject.next(this.personList);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public getPersonListPage(startIndex, pageLength) {
    this.personsPageSubject.next([]); // 9,2,5
    let p = this.personList.slice(startIndex, startIndex + pageLength)
    console.log(["getPersonListPage", startIndex, startIndex + pageLength, p]);
    this.personsPageSubject.next(p); // 9,2,5
  }

  public clearPersonList() {
    this.personsListSubject.next([]);
  }

  /* Single Person */
  public getPersonById(id: number): ClientPerson {
    return this.personList.find(person => person.client_id === id);
  }

  public getPerson(client_id) {
    if( !this.person) {
      this.person = new ClientPerson();
    }
    let apiUrl1 = this.apiUrl + '/' + client_id;
    return this.http.get(apiUrl1)
      .subscribe(
        resp => {
          //console.log(data);
          if (resp['data']) {
            this.person.set(resp['data']);
            this.personSubject.next(this.person);
            //this.personChange.next(resp['data']);
          }
        },
        (err:HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client Side Error.");
          } else {
            console.log('wrong');
          }
        }
      );
  }


  public postPerson(input ) {
    return this.http.post<CcapiResult>(this.apiUrl, input)
      .subscribe(
        resdata => {
          if( resdata.data) {
            this.person.set(resdata.data);
            console.log( ["1-postCcCard", this.person]);
            this.personSubject.next(this.person);
          } else {
            console.log( ["resdata is null for ", resdata, input]);
          }
        }
        , err => {
          console.log(err);
        }
      );
  }

  public setPersonMode(ahowPersonMode: string) {
    let bFlag = ( ahowPersonMode === 'edit');
    this.personShowModeSubject.next([false, !bFlag, bFlag]);
  }

  public setPersonListMode() {
    this.personShowModeSubject.next([true, false, false]);
  }

}
