import { Component, Input, OnChanges, Inject } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { CcCards } from './cc-cards';
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
  ccCard: CcCards;
  isEdit: boolean;



  constructor(
    public dialogRef: MdDialogRef<CcCardComponent>,
    private fb:FormBuilder,
    private ccCompanyService:CcCompanyService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.ccCardsFormControl = new FormControl([Validators.required]);
    this.ccCard = new CcCards();
    if( data.ccCard) {
      this.ccCard.set(data.ccCard);
    }
    this.isEdit = false;
    this.createForm();
  }

  createForm() {
    this.ccCardsForm = this.fb.group(this.getValues());
  }

  ngOnChanges() {
    this.ccCardsForm.reset({});
  }

  ngOnInit() {
    console.log( 'on init');
    //this.ccCompanyService.ccCardSubject.subscribe(
    //  card => {
    //    this.ccCard.set(card);
    //    console.log(["cc-card subscribe", this.ccCard]);
    //  }
    //);
  }

  ngOnDestroy() {
    console.log( 'on destroy');
    //this.ccCompanyService.ccCardSubject.unsubscribe();
  }

onDlgClose(): void {
  this.dialogRef.close();
}
  getValues() {
    return {
      cc_card_id: this.ccCard.cc_card_id
      , cc_company_id: this.ccCard.cc_company_id
      , card_name: this.ccCard.card_name
      , version: this.ccCard.version
      , annual_fee: this.ccCard.annual_fee
      , first_year_free: this.ccCard.first_year_free
    };
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
    this.ccCompanyService.postCcCard (this.ccCardsForm.value);
    this.dialogRef.data.close();
  }

  revert() {
    this.ngOnChanges();
  }
}
