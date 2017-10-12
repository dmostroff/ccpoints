import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AdmUser} from './adm/adm-users';
import { AdmUsersService} from './adm/adm-users.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CC Points';
  footerInfo: String;
  admUser: AdmUser;

  constructor( private router: Router
    , private admUsersService: AdmUsersService) {
    this.admUser = new AdmUser();
    admUsersService.admUserSubject.subscribe( result => {
      if( result) {
        this.admUser.set(result);
      } else {
        this.admUser = new AdmUser();
      }
    });
  }

  get self() { return this; }

  logout() {
    this.admUsersService.logout( this.admUser);
  }
  aboutUs() {
    this.footerInfo = "Scooby Doo";
  }
  trackIt(x) {
    console.log(x);
  }
}
