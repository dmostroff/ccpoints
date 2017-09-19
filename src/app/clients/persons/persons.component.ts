import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonsService} from './../persons.service';
import { ClientPerson} from './../clientperson';
import {MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})

export class PersonsComponent implements OnChanges {
  @Input() person: ClientPerson;
  client_id: number;


  constructor( private personService: PersonsService, private route: ActivatedRoute) {
    this.personService.personSubject.subscribe( person => { this.person = person; })
  }


  ngOnChanges() {
    let x = this.route.snapshot.paramMap.get('client_id');
    if( x == '')  { x = "11"; }
    this.client_id = +x;
    console.log( this.client_id);
    //this.person = this.personService.person;
    this.personService.getPerson(this.client_id);
    }

  ngOnDestroy() {
    // this.personService.personSubject.unsubscribe();
  }

  newClient() {
    let id = Math.floor(Math.random() * 45);
    this.person = this.personService.getPersonById(id);
    // let x = this.personService.getPerson(id);
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onEdit() {
    // TBD
  }
  onClose() {
    this.personService.setPersonListMode();
  }

}
