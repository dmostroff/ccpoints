import { Component, Input, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { CcRoutingModule } from './cc-routing.module'
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';
import { CcCompanyDlgComponent} from './cc-company-dlg.component';

import { PhoneFmtPipe} from './../utils/phonefmt.pipe';
import { ZipCodePipe} from './../utils/zipcode.pipe';

const PWD_REGEX = '/^[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]{8,}$/';

@Component({
  selector: 'cc-company',
  templateUrl: './cc-company.component.html',
  styleUrls: ['./cc-company.component.css']
})

export class CcCompanyComponent implements OnChanges {
  @Input('ccCompany') ccCompany: CcCompany;

  constructor(
    private ccCompanyService: CcCompanyService
    , public mdDialog: MdDialog
    , private route: ActivatedRoute
  ) {
    this.ccCompany = new CcCompany();
    this.ccCompanyService.ccCompanySubject.subscribe(company => {
      console.log(["ccCompanySubject", company]);
      if(company) {
        this.ccCompany.set(company);
        console.log( this.ccCompany);
        //this.setValues();
      }
    });
  }

  //ngOnChanges() {
  //  console.log( 'ngOnChanges - cc-company');
  //  this.ccCompanyForm.reset({});
  //  this.setValues();
  //}
  //
  //ngOnDestroy() {
  //  console.log( 'ngOnDestroy - cc_company');
  //}
  //
  ngOnChanges() {
    //console.log(['ngOnChanges - cc-company data is ',this.ccCompany]);
  }

  ngOnInit() {
    //console.log(['ngOnInit  - cc-company data is ',this.ccCompany]);
  }

  ngDoCheck() {
    //console.log(['ngDoCheck  - cc-company data is ',this.ccCompany]);
  }

  ngAfterContentInit() {
    //console.log("ngAfterContentInit cc-company");
  }

  ngAfterContentChecked() {
    //console.log("ngAfterContentChecked cc-company");
  }

  ngAfterViewInit() {
    //console.log("ngAfterViewInit cc-company");
  }

  ngAfterViewChecked() {
    //console.log("ngAfterViewChecked cc-company");
  }

  ngOnDestroy() {
    //console.log("ngOnDestroy cc-company");
  }

  editForm() {
    console.log( 'ccCompany - editForm');
    let dialogRef = this.mdDialog.open(CcCompanyDlgComponent, {
      data: { ccCompany: this.ccCompany },
      width: "750px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(['The company dialog was closed', result]);
      // this.ccCard.set(result);
    });
  }


  onLoad( company_id) {
    // this.ccCompanyService.getCompany(company_id);
  }

  revert() { this.ngOnChanges(); }
}
