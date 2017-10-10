import { Component, OnChanges, OnDestroy, HostBinding } from '@angular/core';
// , Input
import { Router, ActivatedRoute }       from '@angular/router';

import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { PersonsService} from './../persons.service';
import { ClientPerson} from './../clientperson';
import { PersonDlgComponent } from './person-dlg.component';


@Component({
  selector: 'client-person',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})


export class PersonsComponent { // implements OnChanges {
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';  //@Input() clientPerson: ClientPerson;
  @HostBinding('style.width')  width = "90%";
  @HostBinding('style.height')  height = "90%";

  clientPerson: ClientPerson;

  constructor( private personService: PersonsService
    , public mdDialog: MdDialog
    , private router: Router
    , private activeroute: ActivatedRoute
  ) {
    this.clientPerson = new ClientPerson();
    this.personService.personSubject.subscribe( person => { this.clientPerson = person; })
  }


  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { persondetail: null }}]);
  }

  ngOnChanges() {
    //let client_id = this.activeroute..snapshot.paramMap.get('client_id');
    //if( client_id == '')  { client_id = "11"; }
    //console.log( client_id);
    ////this.person = this.personService.person;
    //this.personService.getPerson(client_id);
    }

  ngOnInit() {
    let client_id = this.activeroute.snapshot.paramMap.get('client_id');
    if( client_id == '')  { client_id = "11"; }
    console.log( client_id);
    //this.person = this.personService.person;
    this.personService.getPerson(client_id);
  }

  ngDoCheck() {
    console.log(['ngDoCheck  - clientPerson data is ',this.clientPerson]);
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit clientPerson");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked clientPerson");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit clientPerson");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked clientPerson");
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
      data: { clientPerson: this.clientPerson },
      width: "750px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The card dialog was closed', result]);
      // this.ccCard.set(result);
    });
  }
  onClose() {
    this.router.navigate(['/clients/persons', {outlets: {'person' : null}}]);
  }

}
