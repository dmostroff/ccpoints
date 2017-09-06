import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ClientPerson} from './clientperson';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonsService {

  apiUrl:string;

  persons:ClientPerson[];
  public personsChange:BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);

  person:ClientPerson;
  private personSubject:BehaviorSubject<ClientPerson> = new BehaviorSubject<ClientPerson>(new ClientPerson());

  constructor(private http:HttpClient) {
    this.apiUrl = 'http://ccapi.com/client/person';
    this.person = new ClientPerson();
    this.persons = <ClientPerson[]>[];
    this.person.last_name = "Ostroff";
    this.person.first_name = "Dan";
  }

  public loadPersons() {
    return this.http.get(this.apiUrl)
      .subscribe(
        resdata => {
          console.log(["resdata", resdata]);
          if (resdata['data']) {
            for (let person of resdata['data']) {
              this.persons.push(person);
            }
            this.personsChange.next(this.persons);
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

  public clearPersons() {
    this.personsChange.next([]);
  }

  public getPersons():Observable < ClientPerson[] > {
    return this.personsChange.asObservable();
  }

  /* Single Person */
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
