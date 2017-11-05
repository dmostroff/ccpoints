import { Component, OnChanges, OnInit, Inject, HostListener } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';

import { ClientPerson } from './../clientperson';
import { PersonsService } from './../persons.service';

import { CcCards } from './../../cc/cc-cards';
import { CcCompanyService } from './../../cc/cc-company.service';

import { PhoneFmtPipe } from './../../utils/phonefmt.pipe';
import { CcNumberPipe} from './../../utils/ccnumber.pipe';

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
  ccCards: CcCards[];
  ccCardSelectedValue: number;

  selectedValue: number;

  isCancel: boolean;

  constructor(
    private fb: FormBuilder
    , private clientAccountService: ClientAccountService
    , private personsService: PersonsService
    , private companyService: CcCompanyService
    , public dialogRef: MdDialogRef<ClientAccount>
    , private ccNumberPipe: CcNumberPipe
    , @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.clientAccount = data.clientAccount;
    this.clientAccountFormControl = new FormControl([Validators.required]);
    if( !(this.clientAccount.account_id > 0)) {
      this.title = "Add Account";
    } else {
      this.title = "Edit Account for " + this.clientAccount.name;
    }
    this.isCancel = false;
    this.selectedValue = this.clientAccount.client_id;
    this.ccCardSelectedValue = this.clientAccount.cc_card_id;

    personsService.personsListSubject.subscribe( data => {
      this.clientPersonList = data;
      console.log( 'client List');
      console.log(data);
    });

    companyService.ccCompanyCardsSubject.subscribe( data => {
      this.ccCards = data;
    });

    this.createForm();
  }

  createForm() {
    this.clientAccountForm = this.fb.group({
      account_id: this.clientAccount.account_id
      , client_id: this.clientAccount.client_id
      , cc_card_id: this.clientAccount.cc_card_id
      , name: this.clientAccount.name
      , account: this.clientAccount.account
      , account_info: this.clientAccount.account_info
      , cc_number: new FormControl(this.clientAccount.cc_number
        , [Validators.required, Validators.pattern("^\d{4}\d{4}\d{4}\d{4}$"), Validators.minLength(16), Validators.maxLength(16)]
        )
      , expdate: this.clientAccount.expdate
      , ccv: this.clientAccount.ccv
      , cc_login: this.clientAccount.cc_login
      , cc_password: this.clientAccount.cc_password
      , cc_status: this.clientAccount.cc_status
      , annual_fee: this.clientAccount.annual_fee
      , credit_limit: this.clientAccount.credit_limit
      , addtional_card: this.clientAccount.addtional_card
    });
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.companyService.getCreditCards();
    let ccNumber = this.ccNumberPipe.transform(this.clientAccountForm.controls['cc_number'].value);
    this.clientAccountForm.patchValue({ccNumber: ccNumber});
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      alert('you just clicked enter');
      // rest of your code
    }
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    let ccNumber = this.ccNumberPipe.transform(this.clientAccountForm.controls['cc_number'].value);
    this.clientAccountForm.patchValue({ccNumber: ccNumber});
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    let ccNumber = this.ccNumberPipe.transform(this.clientAccountForm.controls['cc_number'].value);
    this.clientAccountForm.patchValue({ccNumber: ccNumber});
  }

  getName( ) {
    let bFlag = true;
    for( let ii = 0; bFlag && ii < this.clientPersonList.length; ii++) {
      if( this.clientPersonList[ii].client_id === this.selectedValue) {
        bFlag = false;
        return this.clientPersonList[ii].first_name + ' ' +this.clientPersonList[ii].last_name;
      }
    }
    return null;
  }

  ccNumberChange() {
    console.log('ccNumberChange');
    let ccNumber = this.ccNumberPipe.transform(this.clientAccountForm.controls['cc_number'].value);
    console.log( ccNumber);
    this.clientAccountForm.patchValue({ccNumber: ccNumber});
  }

  clientChange() {
    console.log( this.selectedValue+' - grandmother operation');
    console.log(this.clientAccountForm);
    if( 0 < this.selectedValue) {
      let name = this.getName( );
      if( name ) {
        this.clientAccountForm.patchValue({name: name})
      }
    }
  }
  onSubmit() {
    if( !this.isCancel && this.clientAccountForm.valid) {
      console.log( "submit");
      this.clientAccountService.postClientAccount( this.clientAccountForm.value);
      this.dialogRef.close(true);
    }
  }

  onClickCancel() {
    console.log( "cancel");
    this.isCancel = true;
    this.dialogRef.close(false);
  }

}
