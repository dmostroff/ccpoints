import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonslistComponent }    from './persons/personslist.component';
import { PersonsComponent }    from './persons/persons.component';
import { ClientAddressComponent }    from './persons/client-address.component';

import { ClientAccountListComponent } from './accounts/client-account-list.component';
import { ClientAccountComponent }    from './accounts/client-account.component';
import { ClientAccountPersonComponent }    from './accounts/client-account-person.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'personslist', component: PersonslistComponent},
  { path: 'persons', component: PersonslistComponent, children: [
    { path: ':client_id', component: PersonsComponent, outlet: "person" },
    { path: ':client_id/address/:address_id', component: ClientAddressComponent }
  ] },
  { path: 'person/:client_id', component: PersonsComponent },
  { path: 'accounts', component: ClientAccountListComponent },
  { path: 'accounts/person/:client_id', component: ClientAccountPersonComponent },
  { path: 'account/:account_id', component: ClientAccountComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ClientsRoutingModule {
  constructor() {
    console.log('ClientsRoutingModule');
  }
}
