import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
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
    this.person.last_name = "Ostroff";
    this.person.first_name = "Dan";
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

  public setPersonMode() {
    this.personShowModeSubject.next([false, true]);
  }

  public setPersonListMode() {
    this.personShowModeSubject.next([true, false]);
  }

}
