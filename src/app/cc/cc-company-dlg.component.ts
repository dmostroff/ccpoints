import { Component, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';

@Component({
  selector: 'cc-company-dlg',
  templateUrl: './cc-company-dlg.component.html',
  styleUrls: ['./cc-company-dlg.component.css']
})
export class CcCompanyDlgComponent implements OnChanges {
  ccCompanyForm: FormGroup;
  ccCompanyFormControl: FormControl;
  ccCompany: CcCompany;
  originalCompanyName: string;

  constructor(
    private ccCompanyService: CcCompanyService
    , private fb: FormBuilder
    , public dialogRef: MdDialogRef<CcCompany>
    , @Inject(MD_DIALOG_DATA) public data: any
    ) {
    this.ccCompanyFormControl = new FormControl([Validators.required]);
    this.ccCompany = ccCompanyService.ccCompany;
    this.createForm();
  }

  ngOnChanges() {
    console.log( ["ccCompanyDlg - onChanges", this.ccCompanyForm.value]);
  }



  ngOnInit() {
    console.log( ["ccCompanyDlg - onChanges", this.ccCompanyForm.value]);
    this.originalCompanyName = this.ccCompany.cc_name;
  }

  ngOnDestroy() {
    console.log( ["ccCompanyDlg - ngOnDestroy", this.ccCompanyForm.value]);
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

  onSubmit() {
    this.ccCompanyService.postCompany(this.ccCompanyForm.value);
    console.log([this.originalCompanyName, this.ccCompanyForm.value.cc_name]);
    if( this.originalCompanyName !== this.ccCompanyForm.value.cc_name) {
      this.ccCompanyService.getCompanyList();
    }
    this.dialogRef.close();
  }

  onClickCancel() {
    this.dialogRef.close();
  }

}
