import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';
import { ClientAccountDlgComponent } from './client-account-dlg.component';
import { ConfirmDlgComponent } from "./../../utils/confirm-dlg.component";

import {AuthService} from './../../utils/auth.service';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-client-account-list',
  templateUrl: './client-account-list.component.html',
  styleUrls: ['./client-account-list.component.css']
})
export class ClientAccountListComponent implements OnInit {
  clientAccount:ClientAccount;
  clientAccounts:ClientAccount[];
  dialogRef: MdDialogRef<ConfirmDlgComponent>;
  private clientAccountSubscription : ISubscription;
  private authTokenRCSubscription : ISubscription;

  constructor(public dialog:MdDialog
    , private router:Router
    , private route:ActivatedRoute
    , public clientAccountService:ClientAccountService
    , private authService:AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe(( data:any) => {
      console.log(data);
    });
    console.log(this.route.outlet);
    this.authTokenRCSubscription = this.authService.authTokenRCSubject.subscribe( rc => {
      console.log(['authtokensub', rc]);
      if( rc == 9 || rc == -1 ) {
        console.log( "Accounts List go to login");
        this.router.navigate(['/login']);
      }
    });
    this.clientAccountSubscription = this.clientAccountService.clientAccountListSubject.subscribe(cal => {
      if( cal) {
        console.log( ["Accounts List", cal]);
        this.clientAccounts = cal;
      }
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
      if( result) {
        this.clientAccountService.getClientAccounts();
      }
    });
  }

  public onEditClick(account) {
    let dialogRef = this.dialog.open(ClientAccountDlgComponent, {width: '80%', data: {clientAccount: account}});
    dialogRef.afterClosed().subscribe( result => {

      if( result) {
        this.clientAccountService.getClientAccounts();
      }
    })
  }

  public onDeleteClick(account) {
    this.dialogRef = this.dialog.open(ConfirmDlgComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMsg = "Delete " + account.name + ". Are you sure?";
    this.dialogRef.afterClosed().subscribe(result => {
      if( result) {
        this.clientAccountService.deleteClientAccount(account);
      }
      this.dialogRef = null;
      console.log(['The dialog was closed', result]);
    });
  }

  ngOnDestroy() {
    this.clientAccountSubscription.unsubscribe();
    this.authTokenRCSubscription.unsubscribe();
  }

}
