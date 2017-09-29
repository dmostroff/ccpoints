import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../utils/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PhoneFmtPipe } from './../utils/phonefmt.pipe';

import { PersonsService } from './persons.service';

import { ClientsRoutingModule } from './clients-routing.module';

import { PersonslistComponent }    from './personslist/personslist.component';
import { PersonsComponent }    from './persons/persons.component';
import { PersonDlgComponent } from './persons/person-dlg.component';

import { ClientAddressComponent }    from './persons/client-address.component';
import { ClientAddressDlgComponent } from './persons/client-address-dlg.component';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
  ],
  entryComponents: [PersonDlgComponent],
  declarations: [ PersonslistComponent, PersonsComponent, PersonDlgComponent, ClientAddressComponent, ClientAddressDlgComponent],
  providers: [ PersonsService]
})
export class ClientsModule { }
