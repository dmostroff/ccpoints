import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';


export interface IMenuItem {
  href: string;
  label: string;
}

export class menuItem implements IMenuItem {
  href: string;
  label: string;
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
      { href: "login", label: "Login"}
      , { href: "clients/person/16", label: "Person"}
      , { href: "clients/personslist", label: "Clients"}
    ]

  }

  ngOnInit() {
  }

}