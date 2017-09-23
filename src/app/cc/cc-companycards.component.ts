import { Component, Input, OnChanges } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

import { CcCards } from './cc-cards';
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';
import { CcRoutingModule} from "./cc-routing.module";


@Component({
  selector: 'cc-companycards',
  templateUrl: './cc-companycards.component.html',
  styleUrls: ['./cc-companycards.component.css']
})

export class CcCompanycardsComponent implements OnChanges {
  @Input()  ccCompany: CcCompany;

  ccCompanyCards: CcCards[];
  ccCard: CcCards;

  constructor(
    private ccCompanyService: CcCompanyService
    , private router: Router
  ) {
    this.ccCard = new CcCards();
    this.ccCompanyService.ccCompanySubject.subscribe( company => { if(company) { this.ccCompany = company; }})
    this.ccCompanyService.ccCompanyCardsSubject.subscribe(cards => { if(cards) {  this.ccCompanyCards = cards; console.log(['company cards', this.ccCompanyCards]); }});
  }


  ngOnChanges() {
    console.log('ngOnChanges');
    // this.getCompanyCards( this.ccCompany.cc_company_id);
  }

  //ngOnInit() {
  //  this.getCompanyCards( this.ccCompany.cc_company_id);
  //}
  //
  getCompanyCards( company_id) {
    console.log(['getCompanyCards in omp', company_id, this.ccCompany.cc_company_id]);
    this.ccCompanyService.getCompanyCards( company_id);

  }

  onClick( cc_card_id) {
    console.log(["cc cards", cc_card_id]);
    this.ccCompanyService.getCcCard(cc_card_id);
    //this.router.navigate( ['cc', 'company', id]);
  }

}
