import { Component, OnInit, OnDestroy, NgModule, VERSION  } from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonsService} from './../persons.service';
import { Subscription } from 'rxjs/Subscription';
import { ClientPerson} from './../clientperson';
import {MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements OnInit {
  client_id: number;
  person: ClientPerson;
  subscription: Subscription;

  constructor( private personService: PersonsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let x = this.route.snapshot.paramMap.get('client_id');
    if( x == '')  { x = "11"; }
    this.client_id = +x;
    this.subscription = this.personService.getPerson().subscribe( aperson => { this.person = aperson; });
    console.log( this.client_id);
    //this.person = this.personService.person;
    this.personService.loadPerson(this.client_id);
    this.personService.personSubject.subscribe( p => { this.person = p; })
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newClient() {
    let id = Math.floor(Math.random() * 45);
    this.person = this.personService.getPersonById(id);
    // let x = this.personService.loadPerson(id);
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
