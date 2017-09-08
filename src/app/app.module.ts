import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { ClientsModule } from './clients/clients.module';

/* components */

export interface LiveComponents {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
}

import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';

export const MY_COMPONENTS = {
  'app-component': {
    title: 'Application Component',
    component: AppComponent,
    additionalFiles: null,
    selectorName: null
  },
  'aboutus-component': {
    title: 'About Us Component',
    component: AboutusComponent,
    additionalFiles: null,
    selectorName: null
  },
  'login-component': {
    title: 'Login Component',
    component: LoginComponent,
    additionalFiles: null,
    selectorName: null
  },
  'page-not-found': {
    title: 'Page Not Found',
    component: PageNotFoundComponent,
    additionalFiles: null,
    selectorName: null
  }
}

export const MY_COMPONENTS_LIST = [
  AppComponent,
  AboutusComponent,
  LoginComponent,
  PageNotFoundComponent
]
@NgModule({
  declarations: MY_COMPONENTS_LIST,
  entryComponents: MY_COMPONENTS_LIST,
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    ClientsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
