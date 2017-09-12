import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../utils/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PersonsService } from './persons.service';

import { PersonslistComponent }    from './personslist/personslist.component';
import { PersonsComponent }    from './persons/persons.component';
import { AddressComponent }    from './address/address.component';

import { ClientsRoutingModule } from './clients-routing.module';
import { PersonDlgComponent } from './persons/person-dlg.component';


@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [PersonDlgComponent],
  declarations: [ PersonslistComponent, PersonsComponent, AddressComponent, PersonDlgComponent],
  providers: [ PersonsService]
})
export class ClientsModule { }
