import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  name:string;
  show: boolean = true;
  showSpinner: boolean = true;
  size: number;
  sp: SpinnerComponent;


  constructor() {
    this.name = "Ostroff Enterprises";
    this.size = 25;
    this.sp = new SpinnerComponent();
  }
  toggleSpinner() {
    this.show = !this.show;
    this.showSpinner = this.show;
    console.log(this.show);
  }

  ngOnInit() {
  }

}
