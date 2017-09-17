import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CcCompany } from './cc-company';
import { CcCompanyService } from './cc-company.service';
import {CcRoutingModule} from "./cc-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cc-company-list',
  templateUrl: './cc-company-list.component.html',
  styleUrls: ['./cc-company-list.component.css']
})
export class CcCompanyListComponent implements OnInit {
  ccCompanyList: CcCompany[];

  constructor(private ccCompanyService: CcCompanyService
    , private router: Router
  ) {
    this.ccCompanyList = ccCompanyService.ccCompanyList;
  }


  ngOnInit() {
    this.ccCompanyService.loadCompanyList();
    this.ccCompanyService.bDone.subscribe(isDone => { if(isDone) {  this.ccCompanyList = this.ccCompanyService.ccCompanyList; console.log(this.ccCompanyList); }});
  }

  onClick( id) {
    this.ccCompanyService.ccCompanyId = id;
    console.log(id);
    this.router.navigate( ['cc', 'company', id]);
  }

}
