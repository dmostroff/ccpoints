import { Component, Input, OnChanges, Inject } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { CcCards } from './cc-cards';
import { CcCardsExt } from './cc-cards';
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';

@Component({
  selector: 'cc_card',
  templateUrl: './cc-card.component.html',
  styleUrls: ['./cc-card.component.css']
})
export class CcCardComponent implements OnChanges {

  ccCardsForm:FormGroup;
  ccCardsFormControl:FormControl;
  ccCard:CcCards;
  ccCompanyName: string;
  ccCompanyList:CcCompany[];
  title: string;
  isEdit:boolean;
  isAdd:boolean;


  constructor(public dialogRef:MdDialogRef<CcCardComponent>,
              private fb:FormBuilder,
              private ccCompanyService:CcCompanyService,
              @Inject(MD_DIALOG_DATA) public data:any) {
    this.ccCardsFormControl = new FormControl([Validators.required]);
    this.ccCard = new CcCards();
    console.log(["cc-card constr", data]);
    if (data.ccCardsExt) {
      this.ccCard = data.ccCardsExt.ccCard;
      this.ccCompanyName = data.ccCardsExt.cc_company_name;
      console.log(["0createForm", this.ccCard]);
      console.log(["0]]]]createForm", this.ccCard.cc_card_id]);
      this.isAdd = false;
      this.title = "Edit "+ this.ccCompanyName + ": " + this.ccCard.card_name;
    } else {
      this.isAdd = true;
      this.title = "Add card to "+ this.ccCompanyName;
    }
    if (data.ccCardsExt.ccCompanyList) {
      this.ccCompanyList = data.ccCardsExt.ccCompanyList;
    }
    this.isEdit = false;
    console.log(["1createForm", this.ccCard]);
    this.createForm();
  }

  createForm() {
    console.log(["createForm", this.ccCard]);
    this.ccCardsForm = this.fb.group(
      {
        cc_card_id: this.ccCard.cc_card_id
        , cc_company_id: this.ccCard.cc_company_id
        , card_name: this.ccCard.card_name
        , version: this.ccCard.version
        , annual_fee: this.ccCard.annual_fee
        , first_year_free: this.ccCard.first_year_free
      }
    );
  }

  ngOnChanges() {
    this.ccCardsForm.reset({});
  }

  ngOnInit() {
    console.log('on init');
    //this.ccCompanyService.ccCardSubject.subscribe(
    //  card => {
    //    this.ccCard.set(card);
    //    console.log(["cc-card subscribe", this.ccCard]);
    //  }
    //);
  }

  ngOnDestroy() {
    console.log('on destroy');
    //this.ccCompanyService.ccCardSubject.unsubscribe();
  }

  onDlgClose():void {
    this.dialogRef.close();
  }

  onClickCancel() {
    console.log( this.dialogRef);
    this.dialogRef.close();
  }

  getValues() {
    let x = {
      cc_card_id: this.ccCard.cc_card_id
      , cc_company_id: this.ccCard.cc_company_id
      , card_name: this.ccCard.card_name
      , version: this.ccCard.version
      , annual_fee: this.ccCard.annual_fee
      , first_year_free: this.ccCard.first_year_free
    };
    x['cc_card_id'] = this.ccCard.cc_card_id;
    console.log( ["getValues", x, this.ccCard]);
    return x;
  }

  setValues() {
    this.ccCardsForm.setValue(this.getValues());
  }

  //onLoad(cc_card_id) {
  //  this.ccCompanyService.getCcCard(cc_card_id);
  //  this.ccCompanyService.bDone.subscribe(isDone => {
  //    if (isDone) {
  //      this.setValues();
  //    }
  //  });
  //}
  //
  editForm() {
    this.setValues();
    this.isEdit = true;
  }

  onCardSubmit() {
    this.isEdit = false;
    console.log(this.ccCardsForm.value);
    this.ccCompanyService.postCcCard(this.ccCardsForm.value);
    this.dialogRef.close();
  }

  revert() {
    this.ngOnChanges();
  }
}
