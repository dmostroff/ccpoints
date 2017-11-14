import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AdmUser} from './adm/adm-users';
import { AdmUsersService} from './adm/adm-users.service';
import { AuthService} from './utils/auth.service';

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
  bNavigate: boolean;

  constructor( private router: Router
    , private admUsersService: AdmUsersService
    , private authService: AuthService) {
    this.admUser = new AdmUser();
    this.bNavigate = false;

    admUsersService.admUserSubject.subscribe( result => {
      if( result) {
        this.admUser.set(result);
      } else {
        this.admUser = new AdmUser();
      }
    });

    this.authService.authTokenRCSubject.subscribe( rc => {
      console.log( "logged out? " + rc);
      if( rc == 9 || rc == -1) {
        this.router.navigate(['/login']);
        this.bNavigate = true;
      }
    })
  }

  get self() { return this; }

  logout() {
    this.admUsersService.logout( this.admUser);
  }

  aboutUs() {
    this.footerInfo = "Ostroff Enterprises";
  }

  trackIt(x) {
    console.log(x);
  }
}
