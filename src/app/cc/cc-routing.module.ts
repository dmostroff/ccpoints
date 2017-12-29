import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CcCompanyListComponent } from "./cc-company-list.component";
import { CcCompanyComponent } from './cc-company.component';
import { CcCompanycardsComponent } from './cc-companycards.component';
import { CcCardComponent } from './cc-card.component';

const routes: Routes = [
  { path: 'companylist', component: CcCompanyListComponent },
  { path: 'company/:company_id', component: CcCompanyComponent, outlet: "company" },
  { path: 'company/cards/:company_id', component: CcCompanycardsComponent },
  { path: 'card/:card_id', component: CcCardComponent }
  //, { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class CcRoutingModule {
  constructor() {
    console.log('CcRoutingModule');
  }
}
