import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import {ElementRef,Renderer2, AfterViewInit} from '@angular/core';


export interface IMenuItem {
  href: string;
  label: string;
  //onClick: string;
  //outlet: string;
}

export class menuItem implements IMenuItem {
  href: string;
  label: string;
  //onClick: string;
  //outlet: string;
};


@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})

export class ContextMenuComponent implements AfterViewInit  {
  menuitems:  menuItem[];

  constructor( private router:Router
               , private activeRouter: ActivatedRoute
  , private rd: Renderer2) {
    this.menuitems = [
      { href: "cc/companylist", label: "CCard Companies" }
      , { href: "clients/persons", label: "Clients"}
      , { href: "clients/accounts", label: "Accounts" }
    ]

  }

  ngAfterViewInit() {
  }


  get self() { return this; }

  ngOnInit() {
  }

  onSelect(item) {
    console.log( this.router);
    console.log( this.activeRouter);
    this.router.navigate([item.href]);
  }

}
