import { Component, Input, OnChanges } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

import { CcCards } from './cc-cards';
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';


@Component({
  selector: 'app-cc_cards',
  templateUrl: './cc-card.component.html',
  styleUrls: ['./cc-card.component.css']
})
export class CcCardComponent implements OnChanges {
  @Input()  ccCards:CcCards;

  ccCardsForm:FormGroup;
  ccCardsFormControl:FormControl;

  constructor(private fb:FormBuilder
    , private ccCompanyService:CcCompanyService
    , private route:ActivatedRoute) {
    this.ccCardsFormControl = new FormControl([Validators.required]);
    this.ccCards = this.ccCompanyService.ccCard;
    this.createForm();
  }

  createForm() {
    this.ccCardsForm = this.fb.group({
      cc_card_id: this.ccCards.cc_card_id
      , cc_company_id: this.ccCards.cc_company_id
      , card_name: this.ccCards.card_name
      , version: this.ccCards.version
      , annual_fee: this.ccCards.annual_fee
      , first_year_free: this.ccCards.first_year_free
    });
  }

  ngOnChanges() {
    this.ccCardsForm.reset({});
  }

  setValues() {
    this.ccCardsForm.setValue({
      cc_card_id: this.ccCompanyService.ccCard.cc_card_id
      , cc_company_id: this.ccCompanyService.ccCard.cc_company_id
      , card_name: this.ccCompanyService.ccCard.card_name
      , version: this.ccCompanyService.ccCard.version
      , annual_fee: this.ccCompanyService.ccCard.annual_fee
      , first_year_free: this.ccCompanyService.ccCard.first_year_free
    });
  }

  onLoad(cc_card_id) {
    this.ccCompanyService.getCcCard(cc_card_id);
    this.ccCompanyService.bDone.subscribe(isDone => {
      if (isDone) {
        this.setValues();
      }
    });
  }

  onSubmit() {
    //console.log(this.ccCardsForm.value);
    //this.ccCompanyService.postCcCards, (this.ccCardsForm.value);
    //this.ccCompanyService.bDone.subscribe(isDone => {
    //  if (isDone) {
    //    this.setValues();
    //  }
    //});
  }

  revert() {
    this.ngOnChanges();
  }
}
