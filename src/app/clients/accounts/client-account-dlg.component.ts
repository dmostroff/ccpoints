import { Component, OnChanges, OnInit, Inject } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';

import { ClientPerson } from './../clientperson';
import { PersonsService } from './../persons.service';

@Component({
  selector: 'app-client-account-dlg',
  templateUrl: './client-account-dlg.component.html',
  styleUrls: ['./client-account-dlg.component.css']
})
export class ClientAccountDlgComponent implements OnChanges {

  title: string;
  clientAccount: ClientAccount;

  clientAccountForm: FormGroup;
  clientAccountFormControl: FormControl;

  clientPersonList: ClientPerson[];

  constructor(
    private fb: FormBuilder
    , private clientAccountService: ClientAccountService
    , private personsService: PersonsService
    , public dialogRef: MdDialogRef<ClientAccount>
    , @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.clientAccount = data.clientAccount;
    this.clientAccountFormControl = new FormControl([Validators.required]);
    if( !(this.clientAccount.account_id > 0)) {
      this.title = "Add Account";
    } else {
      this.title = "Edit Account for " + this.clientAccount.name;
    }

    personsService.personsListSubject.subscribe( data => {
      this.clientPersonList = data;
    });

    this.createForm();
  }

  createForm() {
    this.clientAccountForm = this.fb.group({
      account_id: this.clientAccount.account_id
      , client_id: this.clientAccount.client_id
      , name: this.clientAccount.name
      , account: this.clientAccount.account
      , account_info: this.clientAccount.account_info
      , cc_number: this.clientAccount.cc_number
      , expdate: this.clientAccount.expdate
      , ccv: this.clientAccount.ccv
      , cc_login: this.clientAccount.cc_login
      , cc_password: this.clientAccount.cc_password
      , cc_company_id: this.clientAccount.cc_company_id
      , cc_status: this.clientAccount.cc_status
      , annual_fee: this.clientAccount.annual_fee
      , credit_limit: this.clientAccount.credit_limit
      , addtional_card: this.clientAccount.addtional_card
    });
  }

  ngOnChanges() {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log( "submit");
    this.clientAccountService.postClientAccount( this.clientAccountForm.value);
    this.dialogRef.close(true);
  }

  onClickCancel() {
    console.log( "cancel");
    this.dialogRef.close(false);
  }

}
