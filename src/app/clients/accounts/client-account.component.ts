import { Component, Input, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';
import { ClientAccountDlgComponent } from './client-account-dlg.component';

@Component({
  selector: 'client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})

export class ClientAccountComponent implements OnInit {
  @Input() clientAccount: ClientAccount;

  constructor(
    private clientAccountService: ClientAccountService
    , private dialog: MdDialog
    , private route: ActivatedRoute
  ) {
    this.clientAccount = new ClientAccount();
  }

  ngOnInit() {
    console.log('client-account  on init');
  }

  onEdit( ) : void {
      let dialogRef = this.dialog.open(ClientAccountDlgComponent,{ width: '80%', data: { ClientAccount: this.clientAccount }});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clientAccountService.clientAccount = result;
    });
  }

}

