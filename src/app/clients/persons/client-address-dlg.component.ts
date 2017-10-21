import { Component, OnInit } from '@angular/core';

import { PersonsService } from './../persons.service';

@Component({
  selector: 'app-client-address-dlg',
  templateUrl: './client-address-dlg.component.html',
  styleUrls: ['./client-address-dlg.component.css']
})
export class ClientAddressDlgComponent implements OnInit {

  constructor( personsService: PersonsService) { }

  ngOnInit() {
  }

}
