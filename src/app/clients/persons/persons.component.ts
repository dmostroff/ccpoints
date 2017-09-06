import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService} from './../persons.service';
import { Subscription } from 'rxjs/Subscription';
import { ClientPerson} from './../clientperson';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  person: ClientPerson;
  subscription: Subscription;

  constructor( private personService: PersonsService) {
  }

  ngOnInit() {
    this.subscription = this.personService.getPerson().subscribe( aperson => { this.person = aperson; });
    //this.person = this.personService.person;
    this.newClient();
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newClient() {
    let id = Math.floor(Math.random() * 45);
    let x = this.personService.loadPerson(id);
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
