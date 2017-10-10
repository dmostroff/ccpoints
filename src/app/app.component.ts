import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { menuItem } from './utils/context-menu.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CC Points';
  footerInfo: String;
  menuitems:  menuItem[];

  constructor( private router: Router) {
    this.menuitems = [
      { href: "clients/persons", label: "Clients", outlet: "clients", onClick: "clickClients"}
      , { href: "cc/companylist", label: "CCard Companies", outlet: "company", onClick: "clickCompanies" }
    ];
  }

  get self() { return this; }

  clickClients() {
    //this.input.nativeElement.innerHtml('');
    this.router.navigate(['/clients/personslist', {outlets: {'tree' : null}}]);
  }

  clickCompanies() {
    //this.input.nativeElement.innerHtml('');
    this.router.navigate(['/cc/companylist', {outlets: {'primary' : null}}]);
  }
  aboutUs() {
    this.footerInfo = "Scooby Doo";
  }
  trackIt(x) {
    console.log(x);
  }
}
