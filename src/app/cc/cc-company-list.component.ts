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
  ccCompany: CcCompany;
  isEdit: boolean;

  constructor(
    private ccCompanyService: CcCompanyService
    , private router: Router
  ) {
    this.ccCompanyList = ccCompanyService.ccCompanyList;
    this.ccCompanyService.ccCompanySubject.subscribe(company => {
      console.log(["companyList ccCompanySubject", company])
      this.ccCompany = company;
      console.log(this.ccCompany);
    });
  }


  ngOnInit() {
    this.ccCompanyService.ccCompanyListSubject.subscribe(list => { this.ccCompanyList = list; console.log(this.ccCompanyList); });
    this.getCompanyList();
  }

  ngOnDestroy() {
    this.ccCompanyService.ccCompanySubject.unsubscribe();
  }

  getCompanyList() {
    this.ccCompanyService.loadCompanyList();

  }
  onClick( id) {
    this.ccCompanyService.ccCompanyId = id;
    console.log(id);
    this.ccCompanyService.getCompany(id);
    this.ccCompanyService.getCompanyCards(id);
    //this.router.navigate( ['cc', 'company', id]);
  }

  onEdit(id) {
    this.isEdit = true;
  }

}
