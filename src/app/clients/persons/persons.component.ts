import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonsService} from './../persons.service';
import { ClientPerson} from './../clientperson';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PersonDlgComponent } from './person-dlg.component';


@Component({
  selector: 'client-person',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})

export class PersonsComponent implements OnChanges {
  @Input() clientPerson: ClientPerson;
  client_id: number;


  constructor( private personService: PersonsService
    , public mdDialog: MdDialog
    , private route: ActivatedRoute) {
    this.clientPerson = new ClientPerson();
    this.personService.personSubject.subscribe( person => { this.clientPerson = person; })
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
    this.personService.getPersonById(id);
    // let x = this.personService.getPerson(id);
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onPersonEdit() {
    let dialogRef = this.mdDialog.open(PersonDlgComponent, {
      disableClose: false,
      data: { person: this.clientPerson },
      width: "750px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The card dialog was closed', result]);
      // this.ccCard.set(result);
    });
  }
  onClose() {
    this.personService.setPersonListMode();
  }

}
