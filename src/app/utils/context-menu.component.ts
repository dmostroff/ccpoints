import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';


export interface IMenuItem {
  href: string;
  label: string;
  outlet: string;
}

export class menuItem implements IMenuItem {
  href: string;
  label: string;
  outlet: string;
};



@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})

export class ContextMenuComponent implements OnInit {
  menuitems:  menuItem[];

  constructor() {
    this.menuitems = [
      { href: "clients/persons", label: "Clients", outlet: "clients"}
      , { href: "cc/companylist", label: "CCard Companies", outlet: "company"}
    ]

  }

  ngOnInit() {
  }

}
