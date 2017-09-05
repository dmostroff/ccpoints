import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTableModule} from '@angular/material';
import { CdkTable} from '@angular/cdk/table'
import { CdkTableModule } from '@angular/cdk/table';
import { MdDialogModule,MdPaginatorModule } from '@angular/material';

import { PersonsService } from './persons.service';

import { PersonslistComponent }    from './personslist/personslist.component';
import { PersonsComponent }    from './persons/persons.component';
import { AddressComponent }    from './address/address.component';

import { ClientsRoutingModule } from './clients-routing.module';
import { PersonDlgComponent } from './persons/person-dlg.component';


@NgModule({
  imports: [
    CommonModule
    , ClientsRoutingModule
    , MdTableModule
    , CdkTableModule
    , MdDialogModule
    , MdPaginatorModule
  ],
  entryComponents: [PersonDlgComponent],
  declarations: [ PersonslistComponent, PersonsComponent, AddressComponent, PersonDlgComponent],
  providers: [ PersonsService]
})
export class ClientsModule { }
