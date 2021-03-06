import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../utils/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './../utils/token-interceptor';

import { CurrencyPipe} from '@angular/common'
import { PhoneFmtPipe } from './../utils/phonefmt.pipe';
import { AccNumberPipe } from './../utils/accnumber.pipe';
import { AccNumberMaskPipe } from './../utils/acc-number-mask.pipe';

import { PersonsService } from './persons.service';

import { ClientsRoutingModule } from './clients-routing.module';

import { PersonslistComponent }    from './persons/personslist.component';
import { PersonsComponent }    from './persons/persons.component';
import { PersonDlgComponent } from './persons/person-dlg.component';

import { ClientAddressComponent }    from './persons/client-address.component';
import { ClientAddressDlgComponent } from './persons/client-address-dlg.component';

import { ClientAccountService } from './client-account.service';

import { ClientAccountComponent } from './accounts/client-account.component';
import { ClientAccountDlgComponent } from './accounts/client-account-dlg.component';
import { ClientAccountPersonComponent } from './accounts/client-account-person.component';
import { ClientAccountListComponent } from './accounts/client-account-list.component';
import { AccountnumValidatorDirective } from './accounts/accountnum-validator.directive';
import { ShowErrorsComponent } from './accounts/show-errors.component';

@NgModule({
  imports: [
    CommonModule
    , ClientsRoutingModule
    , AppMaterialModule
    , FlexLayoutModule
    , FormsModule
    , ReactiveFormsModule
  ],
  entryComponents: [PersonDlgComponent
    , ClientAddressDlgComponent
    , ClientAccountDlgComponent
  ],
  declarations: [ PersonslistComponent
    , PersonsComponent
    , PersonDlgComponent
    , ClientAddressComponent
    , ClientAddressDlgComponent
    , ClientAccountComponent
    , ClientAccountDlgComponent
    , ClientAccountPersonComponent
    , ClientAccountListComponent
    , AccountnumValidatorDirective
    , ShowErrorsComponent
    , AccNumberPipe
    , AccNumberMaskPipe
  ],
  providers: [ AccNumberPipe, AccNumberMaskPipe, PersonsService, CurrencyPipe, ClientAccountService
    , {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
} ]
})
export class ClientsModule { }
