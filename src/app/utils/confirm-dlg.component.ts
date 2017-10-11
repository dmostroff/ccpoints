import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dlg',
  templateUrl: './confirm-dlg.component.html',
  styleUrls: ['./confirm-dlg.component.css']
})
export class ConfirmDlgComponent {

  public confirmMsg: string;
  public okMsg: string;
  public cancelMsg: string;

  constructor( public dialogRef: MdDialogRef<ConfirmDlgComponent>) {
    this.okMsg = 'OK';
    this.cancelMsg = 'Cancel';
  }

}
