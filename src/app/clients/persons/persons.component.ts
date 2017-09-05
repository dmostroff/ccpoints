import { Component, OnInit } from '@angular/core';
import { PersonsService} from './../persons.service';
import { ClientPerson} from './../clientperson';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  person: ClientPerson;

  constructor( private personService: PersonsService) {
    this.person = new ClientPerson;
  }

  ngOnInit() {
    this.person = this.personService.person;
    this.newClient();
    }

  newClient() {
    let id = Math.floor(Math.random() * 45);
    let x = this.personService.getPerson(id);
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
