import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../utils/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CcRoutingModule } from './cc-routing.module';
import { CcCompanyService } from './cc-company.service';
import { CcCompanyListComponent } from './cc-company-list.component';
import { CcCompanyComponent } from './cc-company.component';
import { CcCardComponent } from './cc-card.component';
import { CcCompanycardsComponent } from './cc-companycards.component';

import { PhoneFmtPipe } from './../utils/phonefmt.pipe';
import { ZipCodePipe } from './../utils/zipcode.pipe'

const componentList = [
  CcCompanyListComponent
  , CcCompanyComponent
  , CcCompanycardsComponent
  , CcCardComponent
  , PhoneFmtPipe
  , ZipCodePipe
];

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CcRoutingModule
  ],
  declarations: componentList,
  providers: [CcCompanyService ]
})
export class CcModule {
  constructor() {
    console.log( 'CcModule');
  }
}
