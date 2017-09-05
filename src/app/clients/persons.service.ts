import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ClientPerson} from './clientperson'
import 'rxjs/add/operator/map';

@Injectable()
export class PersonsService {

  personsChange: BehaviorSubject<ClientPerson[]> = new BehaviorSubject<ClientPerson[]>([]);
  get myPersonsData(): ClientPerson[] { return this.personsChange.value; }
  persons: ClientPerson[];
  person: ClientPerson;
  personChange: BehaviorSubject<ClientPerson> = new BehaviorSubject<ClientPerson>(new ClientPerson());
  get myPersonData(): ClientPerson { return this.personChange.value; }

  constructor(private http: HttpClient) {
    this.person = new ClientPerson();
    this.persons = <ClientPerson[]>[];
    this.person.last_name = "Ostroff";
    this.person.first_name = "Dan";
  }

  getPerson(client_id) {
    let apiUrl = 'http://ccapi.com/client/person/' + client_id;
    return this.http.get(apiUrl)
      .subscribe(
        resp => {
          //console.log(data);
          if (resp['data']) {
            this.myPersonData.set( resp['data']);
            this.personChange.next(resp['data']);
          }
        },
        (err:HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log( "Client Side Error.");
          } else {
            console.log('wrong');
          }
        }
      );
  }

  getPersonsList() {
    let apiUrl = 'http://ccapi.com/client/person';
    return this.http.get(apiUrl)
      .subscribe(
        resdata => {
          console.log(resdata);
          if(resdata['data']) {
            for( let person of resdata['data']) {
              const cData = this.myPersonsData.slice();
              cData.push(person);
              //console.log( person);
              this.personsChange.next(cData);
            }
            //console.log( "~~~~~~~~~~~~~~~~~~~");
            //console.log( this.persons);
            //console.log( this.persons[3]);
          }
        },
        (err:HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log( "Client Side Error.");
          } else {
            console.log('wrong');
          }
        }
      );
  }


}
