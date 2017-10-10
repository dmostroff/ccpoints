import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientPerson } from './../clientperson';
import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';
import { ClientAccountDlgComponent } from './client-account-dlg.component';

@Component({
  selector: 'client-account-person',
  templateUrl: './client-account-person.component.html',
  styleUrls: ['./client-account-person.component.css']
})
export class ClientAccountPersonComponent implements OnInit {

  clientPerson: ClientPerson;
  clientAccounts: ClientAccount[];
  clientAccount: ClientAccount;
  constructor(
    private clientAccountService: ClientAccountService
    , private dialog: MdDialog
    , private router: Router
    , private activeroute: ActivatedRoute
  ) {
    this.clientAccount = new ClientAccount();
    this.clientAccountService.clientAccountsPersonSubject.subscribe( clientAccounts => { this.clientAccounts = clientAccounts; })
  }

  ngOnInit() {
    let client_id = this.activeroute.snapshot.paramMap.get('client_id');
    if( client_id == '')  { client_id = "11"; }
    console.log( client_id);
    //this.person = this.personService.person;
    this.clientAccountService.getClientAccountsPerson(client_id);
  }

  onEdit(row) {
    let dialogRef = this.dialog.open(ClientAccountDlgComponent, {
      data: { clientAccount: this.clientAccount },
      width: "750px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The card dialog was closed', result]);
      // this.ccCard.set(result);
    });
  }

  onClose() {
    this.router.navigate(['/clients/accounts/person', {outlets: {'person' : null}}]);
  }

  onClickAccount() {

  }
}
