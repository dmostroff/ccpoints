import { Component, OnChanges, OnInit, Inject, HostListener } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { ClientAccount } from './../client-account';
import { ClientAccountService } from './../client-account.service';

import { ClientPerson } from './../clientperson';
import { PersonsService } from './../persons.service';
import { UtilsService } from './../../utils/utils.service';

import { CcCards } from './../../cc/cc-cards';
import { CcCompanyService } from './../../cc/cc-company.service';

import { AccNumberPipe} from './../../utils/accnumber.pipe';
import { AccountFormatDirective} from './account-format.directive';

@Component({
  selector: 'app-client-account-dlg',
  templateUrl: './client-account-dlg.component.html',
  styleUrls: ['./client-account-dlg.component.css']
})
export class ClientAccountDlgComponent implements OnChanges {

  title: string;
  clientAccount: ClientAccount;
  accountDate: Date;

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
    , private utilsService: UtilsService
    , public dialogRef: MdDialogRef<ClientAccount>
    , private accNumberPipe: AccNumberPipe
    , @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.clientAccount = data.clientAccount;
    this.clientAccount.account_date = new Date(this.clientAccount.account_date);
    this.clientAccountFormControl = new FormControl(); // [Validators.required]
    if( !(this.clientAccount.account_id > 0)) {
      this.title = "Add Account";
    } else {
      this.title = "Edit Account for " + this.clientAccount.name;
    }
    this.isCancel = false;
    this.selectedValue = this.clientAccount.client_id;
    this.ccCardSelectedValue = this.clientAccount.cc_card_id;
    this.accNumberPipe = new AccNumberPipe();

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
    let account_date = new Date(this.clientAccount.account_date);

    this.clientAccount.account_num = this.accNumberPipe.transform(this.clientAccount.account_num);

    let annual_fee = this.utilsService.currencyInit(this.clientAccount.annual_fee);
    let credit_limit = this.utilsService.currencyInit(this.clientAccount.credit_limit);

    console.log( ['createForm', this.clientAccount.account_date]);
    this.clientAccountForm = this.fb.group({
      account_id: this.clientAccount.account_id
      , client_id: this.clientAccount.client_id
      , cc_card_id: this.clientAccount.cc_card_id
      , name: this.clientAccount.name
      , account: this.clientAccount.account
      , account_num: //this.clientAccount.cc_number
        new FormControl(this.clientAccount.account_num
          // , [Validators.required, Validators.minLength(16), Validators.maxLength(16)] //, Validators.pattern("\d+")
         )
      , account_info: this.clientAccount.account_info
      , account_date: this.clientAccount.account_date
      , cc_login: this.clientAccount.cc_login
      , cc_password: this.clientAccount.cc_password
      , cc_status: this.clientAccount.cc_status
      , annual_fee: annual_fee
      , credit_limit: credit_limit
      , addtional_card: this.clientAccount.addtional_card
    });

    this.clientAccountForm.controls['account_num'].valueChanges.subscribe(
      (value: string) => {
        //console.log('accnumber changed to:', value);
        let v = this.accNumberPipe.transform(value); // this.accountNumberFormat(value);
        this.clientAccountForm.controls['account_num'].setValue(v, {emitEvent: false});
      });
    this.clientAccountForm.controls['annual_fee'].valueChanges.subscribe(
      (value: string) => {
        let v = this.utilsService.currencyFmt(value );
        console.log(["after annual fee:", v]);
        this.clientAccountForm.controls['annual_fee'].setValue(v, {emitEvent: false});
      });
    this.clientAccountForm.controls['credit_limit'].valueChanges.subscribe(
      (value: string) => {
        let v = this.utilsService.currencyFmt(value );
        console.log(["after credit_limit:", v]);
        this.clientAccountForm.controls['credit_limit'].setValue(v, {emitEvent: false});
      });

  }

  ngOnChanges(changes) {
    console.log( ["onChange", changes]);
    let x =0;
  }

  ngOnInit() {
    this.companyService.getCreditCards();
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      alert('you just clicked enter');
      // rest of your code
    }
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

  accountNumberChange() {
    console.log('accountNumberChange');
    let ccNumber = this.accNumberPipe.transform(this.clientAccountForm.controls['accountnumber'].value);
    console.log( ccNumber);
    this.clientAccountForm.patchValue({accnumber: ccNumber});
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

  //private getMessageSignature(apiSecret: string, path: string, request: string, nonce: number) {
  //  const secret = CryptoJS.enc.Base64.parse(apiSecret);
  //  const hashDigest = CryptoJS.SHA256(nonce + request);
  //
  //  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, secret);
  //  hmac.update(path);
  //  hmac.update(hashDigest);
  //
  //  return CryptoJS.enc.Base64.stringify(hmac.finalize());
  //let x = this.getMessageSignature('lois', 'allergy', this.clientAccountForm.controls['accnumber'].value, 21);
  ///let y = CryptoJS.toHex(CryptoJS.SHA256, this.clientAccountForm.controls['accnumber'].value);
  //}

  onSubmit() {
    if( !this.isCancel && this.clientAccountForm.valid) {
      console.log( "submit");
      let v = this.utilsService.toNumber(this.clientAccountForm.controls['annual_fee'].value);
      this.clientAccountForm.controls['annual_fee'].setValue(v, {emitEvent: false});
      v = this.utilsService.toNumber(this.clientAccountForm.controls['credit_limit'].value);
      this.clientAccountForm.controls['credit_limit'].setValue(v, {emitEvent: false});
      console.log( this.clientAccountForm.value);
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
