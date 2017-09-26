import { Component, Input, OnChanges } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { CcCards } from './cc-cards';
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';
import { CcRoutingModule} from "./cc-routing.module";
import {CcCardComponent} from "./cc-card.component";


@Component({
  selector: 'cc-companycards',
  templateUrl: './cc-companycards.component.html',
  styleUrls: ['./cc-companycards.component.css']
})

export class CcCompanycardsComponent implements OnChanges {
  @Input('ccCompany') ccCompany:CcCompany;

  ccCompanyCards:CcCards[];
  ccCard:CcCards;
  isEdit: boolean;
  isReady: boolean;
  dlgRef: MdDialogRef<any>;
  bDlgReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private ccCompanyService:CcCompanyService
    , public dialog: MdDialog
    , private router:Router) {
    this.ccCard = new CcCards();
    this.isEdit = false;
    this.isReady = false;

    //this.ccCompany = new CcCompany();
    //this.ccCompanyService.ccCompanySubject.subscribe(
    //  company => {
    //    if (company) {
    //      this.ccCompany = company;
    //    }
    //  }
    //);

    this.ccCompanyService.ccCompanyCardsSubject.subscribe(
      cards => {
        this.ccCompanyCards = cards;
        console.log(['company cards', this.ccCompanyCards]);
      }
    );
    this.bDlgReady.subscribe( bFlag => { if( bFlag) { this.showDlg(); } })
    this.ccCompanyService.ccCardSubject.subscribe(
      card => {
        this.ccCard.set(card);
        console.log(['company card', this.ccCard]);
      }
    );
  }


  ngOnChanges() {
    console.log('ngOnChanges');
    // this.getCompanyCards( this.ccCompany.cc_company_id);
  }


  ngOnDestroy() {
    console.log( 'ngOnDestroy - cc_company');
  }
  //ngOnInit() {
  //  this.getCompanyCards( this.ccCompany.cc_company_id);
  //}
  //
  //getCompanyCards( company_id) {
  //  console.log(['getCompanyCards in omp', company_id, this.ccCompany.cc_company_id]);
  //  this.ccCompanyService.getCompanyCards( company_id);
  //
  //}

  onClickCard(cc_card_id): void {
    console.log(["cc cards", cc_card_id]);
    this.ccCompanyService.getCcCard(cc_card_id);
    this.bDlgReady.next(true);
  }

  showDlg(): void {
    console.log(["cc cards showDlg", this.ccCard]);
    let dialogRef = this.dialog.open(CcCardComponent,{ width: '750px', data: { ccCard: this.ccCard }});
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The card dialog was closed', result]);
      // this.ccCard.set(result);
    });
    //this.router.navigate( ['cc', 'company', id]);
  }
}
