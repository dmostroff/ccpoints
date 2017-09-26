import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CcCompany } from './cc-company';
import { CcCards } from './cc-cards';
import { CcCompanyService } from './cc-company.service';
import { CcRoutingModule } from "./cc-routing.module";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cc-company-list',
  templateUrl: './cc-company-list.component.html',
  styleUrls: ['./cc-company-list.component.css']
})
export class CcCompanyListComponent implements OnInit {
  ccCompanyList: CcCompany[];
  ccCompany: CcCompany;
  ccCard: CcCards;
  ccCardId: number;
  isEdit: boolean;

  constructor(
    private ccCompanyService: CcCompanyService
    , private router: Router
  ) {
    this.ccCompanyList = ccCompanyService.ccCompanyList;
    this.ccCompany = new CcCompany();
    this.ccCard = new CcCards();
  }


  ngOnInit() {
    this.ccCompanyService.ccCompanySubject.subscribe(company => {
      console.log(["companyList ccCompanySubject", company])
      this.ccCompany.set(company);
      console.log(this.ccCompany);
    });
    this.ccCompanyService.ccCompanyListSubject.subscribe(list => { this.ccCompanyList = list; console.log(this.ccCompanyList); });
    this.ccCompanyService.ccCardSubject.subscribe(
      card => {
        this.ccCard.set(card);
        console.log(["comp list subscribe", this.ccCard]);
      }
    );
    this.ccCompanyService.getCompanyList();
  }

  ngOnDestroy() {
    this.ccCompanyService.ccCompanySubject.unsubscribe();
    this.ccCompanyService.ccCompanyListSubject.unsubscribe();
    this.ccCompanyService.ccCardSubject.unsubscribe();
  }

  getCompanyList() {
    this.ccCompanyService.getCompanyList();

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

  onClickCard( cc_card_id) {
    this.ccCompanyService.getCcCard(cc_card_id);
  }

}
