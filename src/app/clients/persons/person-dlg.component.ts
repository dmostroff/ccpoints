import { Component, Input, OnChanges, Inject } from "@angular/core";
import { FormArray, FormBuilder} from "@angular/forms";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { PersonsService } from './../persons.service';
import { ClientPerson } from './../clientperson';

@Component({
  selector: 'client-person-dlg',
  templateUrl: './person-dlg.component.html',
  styleUrls: ['./person-dlg.component.css']
})
export class PersonDlgComponent implements OnChanges {

  clientPersonForm:FormGroup;
  clientPersonFormControl:FormControl;

  clientPerson: ClientPerson;
  first_name = "Dan";

  constructor(
    public personsService: PersonsService,
    private fb:FormBuilder,
    public dialogRef: MdDialogRef<ClientPerson>,
    @Inject(MD_DIALOG_DATA) public data: any) {
      this.clientPerson = data.clientPerson;
      this.createForm();
    this.clientPersonFormControl = new FormControl([Validators.required]);
  }

  createForm() {
    this.clientPersonForm = this.fb.group({
      client_id: this.clientPerson.client_id
      , last_name: this.clientPerson.last_name
      , first_name: this.clientPerson.first_name
      , middle_name: this.clientPerson.middle_name
      , dob: this.clientPerson.dob
      , gender: this.clientPerson.gender
      , ssn: this.clientPerson.ssn
      , mmn: this.clientPerson.mmn
      , email: this.clientPerson.email
      , pwd: this.clientPerson.pwd
      , phone: this.clientPerson.phone
      , phone_2: this.clientPerson.phone_2
      , phone_cell: this.clientPerson.phone_cell
      , phone_fax: this.clientPerson.phone_fax
      , phone_official: this.clientPerson.phone_official
    });
  }

  ngOnChanges() {
    this.clientPersonForm.setValue({
      client_id: this.clientPerson.client_id
      , last_name: this.clientPerson.last_name
      , first_name: this.clientPerson.first_name
      , middle_name: this.clientPerson.middle_name
      , dob: this.clientPerson.dob
      , gender: this.clientPerson.gender
      , ssn: this.clientPerson.ssn
      , mmn: this.clientPerson.mmn
      , email: this.clientPerson.email
      , pwd: this.clientPerson.pwd
      , phone: this.clientPerson.phone
      , phone_2: this.clientPerson.phone_2
      , phone_cell: this.clientPerson.phone_cell
      , phone_fax: this.clientPerson.phone_fax
      , phone_official: this.clientPerson.phone_official
    });
  }

  onSubmit() {
    this.personsService.postPerson(this.clientPersonForm.value);
    this.dialogRef.close();
  }

  onClickCancel() {
    this.dialogRef.close();
  }

}
