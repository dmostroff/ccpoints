import { Component, Input, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

import { CcRoutingModule } from './cc-routing.module'
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';

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
  @Input() isEdit: boolean;

  // ccCompany: CcCompany;
  ccCompanyForm: FormGroup;
  ccCompanyFormControl: FormControl;
  ccCompanyId: number;

  constructor(
    private fb: FormBuilder
    , private ccCompanyService: CcCompanyService
    , private route: ActivatedRoute
  ) {
    this.isEdit = false;
    this.ccCompanyFormControl = new FormControl([Validators.required, Validators.pattern(PWD_REGEX)]);
    this.ccCompany = ccCompanyService.ccCompany;
    this.createForm();
    //this.route.params.subscribe( params => {
    //  this.ccCompanyId = +params['company_id']; console.log(["Today I staretd Loving You again", params, this.ccCompanyId])
    //  this.onLoad(this.ccCompanyId);
    //} );
    //this.ccCompanyService.ccCompanySubject.subscribe(company => {
    //  console.log(["ccCompanySubject", company]);
    //  if(company) {
    //    this.ccCompany.set(company);
    //    console.log( this.ccCompany);
    //    this.setValues();
    //  }
    //});
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
    console.log(['ngOnChanges - cc-company data is ',this.ccCompany]);
  }

  ngOnInit() {
    console.log(['ngOnInit  - cc-company data is ',this.ccCompany]);
  }

  ngDoCheck() {
    console.log(['ngDoCheck  - cc-company data is ',this.ccCompany, this.ccCompanyForm.pristine, this.ccCompanyForm.touched]);
    if(this.isEdit && this.ccCompanyForm.pristine) {
      this.setValues();
    }
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit cc-company");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked cc-company");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit cc-company");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked cc-company");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy cc-company");
  }

  editForm() {
    this.setValues();
    this.isEdit = true;
  }

  getValues() {
    if( this.ccCompany) {
      console.log(["getValues", this.ccCompany]);
      let x = {
        cc_company_id: this.ccCompany.cc_company_id
        , cc_name: this.ccCompany.cc_name
        , url: this.ccCompany.url
        , contact: this.ccCompany.contact
        , address_1: this.ccCompany.address_1
        , address_2: this.ccCompany.address_2
        , city: this.ccCompany.city
        , state: this.ccCompany.state
        , zip: this.ccCompany.zip
        , country: this.ccCompany.country
        , phone: this.ccCompany.phone
        , phone_2: this.ccCompany.phone_2
        , phone_cell: this.ccCompany.phone_cell
        , phone_fax: this.ccCompany.phone_fax
      };
      return x;
    } else {
      return {};
    }
  }

  createForm() {
    let vals = this.getValues();
    this.ccCompanyForm = this.fb.group(vals);
  }

  setValues() {
    let vals = this.getValues();
    this.ccCompanyForm.setValue(vals);
  }

  onLoad( company_id) {
    // this.ccCompanyService.getCompany(company_id);
  }

  onCompanySubmit() {
    console.log(["onCompanySubmit", this.ccCompanyForm.value]);
    this.ccCompanyService.postCompany(this.ccCompanyForm.value);
    this.ccCompanyService.getCompanyList();
    this.isEdit = false;
  }
  revert() { this.ngOnChanges(); }
}
