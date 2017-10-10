import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';
import { ClientAccountDlgComponent } from './client-account-dlg.component';

@Component({
  selector: 'app-client-account-list',
  templateUrl: './client-account-list.component.html',
  styleUrls: ['./client-account-list.component.css']
})
export class ClientAccountListComponent implements OnInit {
  clientAccount:ClientAccount;
  clientAccounts:ClientAccount[];


  constructor(public dialog:MdDialog
    , private route:ActivatedRoute
    , public clientAccountService:ClientAccountService) {
  }

  ngOnInit() {
    this.route.data.subscribe(( data:any) => {
      console.log(data);
    });
    console.log(this.route.outlet);
    this.clientAccountService.clientAccountListSubject.subscribe(cal => {
      this.clientAccounts = cal;
    })
    this.clientAccountService.getClientAccounts();
  }

  onAddClick():void {
    this.clientAccount = new ClientAccount();
    let dialogRef = this.dialog.open(ClientAccountDlgComponent, {
      width: '80%',
      data: {clientAccount: this.clientAccount}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(['The dialog was closed', result]);
    });
  }

  public onEditClick(account) {
    let dialogRef = this.dialog.open(ClientAccountDlgComponent, {width: '80%', data: {clientAccount: account}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The dialog was closed', result]);
    });
  }

}
