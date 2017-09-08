import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ClientPerson} from './clientperson';
import 'rxjs/add/operator/map';

import { CcapiResult } from './../ccapi';

@Injectable()
export class PersonsService {

  apiUrl:string;
  personListCount: Number;

  personList:ClientPerson[];
  public personsListChange:BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);
  public plDone: Subject<boolean> = new Subject();

  person:ClientPerson;
  private personSubject:BehaviorSubject<ClientPerson> = new BehaviorSubject<ClientPerson>(new ClientPerson());

  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com/client/person';
    this.person = new ClientPerson();
    this.personList = <ClientPerson[]>[];
    this.person.last_name = "Ostroff";
    this.person.first_name = "Dan";
    this.plDone = new Subject<boolean>();
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

  public loadPersonList( ) {
    this.plDone.next(false);
    return this.http.get<CcapiResult>(this.apiUrl)
      .subscribe(
        resdata => {
          this.personList = resdata.data;
          this.personListCount = this.personList.length;
          console.log( [this.personList, this.personList.length] );
          this.plDone.next(true);
        }
        , err => {
          console.log(err);
        }
      );
  }

  public retrievePersonList( startIndex, pageLength) {
    let p = this.personList.slice(startIndex, startIndex + pageLength)
    console.log([startIndex, startIndex + pageLength, p]);
    this.personsListChange.next(p); // 9,2,5
  }

  public clearPersonList() {
    this.personsListChange.next([]);
  }

  public getPersonList():Observable < ClientPerson[] > {
    return this.personsListChange.asObservable();
  }

  public isPersonListDone():Observable <boolean> {
    return this.plDone.asObservable();
  }

  /* Single Person */
  public getPersonById(id: number): ClientPerson {
    return this.personList.find(person => person.client_id === id);
  }

  public loadPerson(client_id) {
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

  public clearPerson() {
    let cp = new ClientPerson();
    this.personSubject.next(cp);
  }

  public getPerson():Observable < ClientPerson > {
    return this.personSubject.asObservable();
  }

  //xgetPersonsList() {
  //  let apiUrl = 'http://ccapi.com/client/person';
  //  return this.http.get(apiUrl)
  //    .subscribe(
  //      resdata => {
  //        console.log(resdata);
  //        if (resdata['data']) {
  //          for (let person of resdata['data']) {
  //            const cData = this.myPersonsData.slice();
  //            cData.push(person);
  //            //console.log( person);
  //            this.personsChange.next(cData);
  //          }
  //          //console.log( "~~~~~~~~~~~~~~~~~~~");
  //          //console.log( this.persons);
  //          //console.log( this.persons[3]);
  //        }
  //      },
  //      (err:HttpErrorResponse) => {
  //        if (err.error instanceof Error) {
  //          console.log("Client Side Error.");
  //        } else {
  //          console.log('wrong');
  //        }
  //      }
  //    );
  //}

  handleError(x) {
    console.log(x);
  }


}
