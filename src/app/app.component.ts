import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CC Points';
  footerInfo: String;

  aboutUs() {
    this.footerInfo = "Scooby Doo";
  }
  trackIt(x) {
    console.log(x);
  }
}
