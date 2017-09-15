import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder} from '@angular/forms';
import {FormGroup, FormControl, Validators} from '@angular/forms';
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

  constructor(
    private fb: FormBuilder
    , private ccCompanyService: CcCompanyService
  ) {
    this.ccCompanyFormControl = new FormControl([Validators.required, Validators.pattern(PWD_REGEX)]);
    this.ccCompany = ccCompanyService.ccCompany;
    this.createForm();
  }

  createForm() {
    this.ccCompanyForm = this.fb.group({
      cc_company_id: 0
      , cc_name: ''
      , url: ''
      , contact: ''
      , address_1: ''
      , address_2: ''
      , city: ''
      , state: ''
      , zip: ''
      , country: ''
      , phone: ''
      , phone_2: ''
      , phone_cell: ''
      , phone_fax: ''
    });
  }

  ngOnChanges() {
    this.ccCompanyForm.reset({
    });
  }

  onSubmit() {
    console.log(this.ccCompanyForm.value);
    this.ccCompanyService.post(this.ccCompanyForm.value);
    this.ccCompanyService.bDone.subscribe(isDone => { if(isDone) {  this.ccCompany = this.ccCompanyService.ccCompany; console.log(this.ccCompany); }});
  }
  revert() { this.ngOnChanges(); }
}
