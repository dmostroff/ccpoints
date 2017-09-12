import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.name = "Ostroff Enterprises";
    this.size = 25;
  }
  toggleSpinner() {
    this.show = !this.show;
    this.showSpinner = this.show;
    console.log(this.show);
  }

  ngOnInit() {
  }

}
