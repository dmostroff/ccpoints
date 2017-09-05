import { Component, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdIconRegistry } from '@angular/material';
import { ClientPerson } from './../clientperson';

@Component({
  selector: 'app-person-dlg',
  templateUrl: './person-dlg.component.html',
  styleUrls: ['./person-dlg.component.css']
})
export class PersonDlgComponent {

  person: ClientPerson;
  first_name = "Dan";
  constructor(
    public dialogRef: MdDialogRef<PersonDlgComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) {
    this.person = data.person;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
