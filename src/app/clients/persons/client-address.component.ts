import { Component, Input, OnChanges } from '@angular/core';

import { PersonsService } from './../persons.service';
import { ClientAddress } from './client-address';

@Component({
  selector: 'client-address',
  templateUrl: './client-address.component.html',
  styleUrls: ['./client-address.component.css']
})
export class ClientAddressComponent implements OnChanges {
  @Input('client_id') client_id: number;

  clientAddress: ClientAddress
  constructor(personsService: PersonsService) {
    this.clientAddress = new ClientAddress();
  }

  ngOnChanges() {
  }

}
