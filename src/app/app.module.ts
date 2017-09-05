import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MdTableModule} from '@angular/material';
import { CdkTable} from '@angular/cdk/table'
import { CdkTableModule } from '@angular/cdk/table';

import { AppRoutingModule } from './app-routing.module';

import { ClientsModule } from './clients/clients.module';

import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    ClientsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
