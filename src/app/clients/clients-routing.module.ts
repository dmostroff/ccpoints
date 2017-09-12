import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonslistComponent }    from './personslist/personslist.component';
import { PersonsComponent }    from './persons/persons.component';
import { AddressComponent }    from './address/address.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'personslist', component: PersonslistComponent },
  { path: 'person/:client_id', component: PersonsComponent },
  { path: 'address', component: AddressComponent }
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
    console.log('Kennedy');
  }
}
