import { Component, Input, OnChanges } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

import { CcRoutingModule } from './cc-routing.module'
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';


const PWD_REGEX = '/^[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]{8,}$/';

@Component({
  selector: 'app-cc-company',
  templateUrl: './cc-company.component.html',
  styleUrls: ['./cc-company.component.css']
})

export class CcCompanyComponent implements OnChanges {
  @Input()  ccCompany: CcCompany;

  ccCompanyForm: FormGroup;
  ccCompanyFormControl: FormControl;
  ccCompanyId: number;

  constructor(
    private fb: FormBuilder
    , private ccCompanyService: CcCompanyService
    , private route: ActivatedRoute
  ) {
    this.ccCompanyFormControl = new FormControl([Validators.required, Validators.pattern(PWD_REGEX)]);
    this.ccCompany = ccCompanyService.ccCompany;
    this.route.params.subscribe( params => {
      this.ccCompanyId = +params['company_id']; console.log(["Today I staretd Loving You again", params, this.ccCompanyId])
      this.onLoad(this.ccCompanyId);
    } );
    this.createForm();
  }


  createForm() {
    this.ccCompanyForm = this.fb.group({
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
    });
  }

  ngOnChanges() {
    this.ccCompanyForm.reset({
    });
  }

  setValues() {
    console.log(this.ccCompany.cc_name);
    this.ccCompanyForm.controls['cc_name'].setValue(this.ccCompany.cc_name, {cc_name: this.ccCompany.cc_name});
    //this.ccCompanyForm.controls['cc_company_id'].patchValue(this.ccCompany.cc_company_id);
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
    this.ccCompanyForm.setValue(x);
  }

  onLoad( company_id) {
    this.ccCompanyService.getCompany(company_id);
    this.ccCompanyService.bDone.subscribe(isDone => {
        if(isDone) {
          this.ccCompany = this.ccCompanyService.ccCompany; console.log([ "Tonight the bottle let me down", this.ccCompany.cc_name]);
          this.setValues();
        }
      });
  }

  onSubmit() {
    console.log(this.ccCompanyForm.value);
    this.ccCompanyService.postCompany(this.ccCompanyForm.value);
    this.ccCompanyService.bDone.subscribe(isDone => { if(isDone) {  this.ccCompany.set(this.ccCompanyService.ccCompany); console.log(this.ccCompany.cc_name); }});
  }
  revert() { this.ngOnChanges(); }
}
