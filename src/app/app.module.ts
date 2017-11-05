import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './utils/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientsModule } from './clients/clients.module';
import { CcModule } from './cc/cc.module';
import { AuthService } from './utils/auth.service';
import { AdmUsersService } from './adm/adm-users.service';
import { TokenInterceptor } from './utils/token-interceptor';
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
import { ContextMenuComponent } from './utils/context-menu.component';
import { ConfirmDlgComponent } from './utils/confirm-dlg.component';

export const MY_COMPONENTS = {
  'app-component': {
    title: 'Application Component',
    component: AppComponent,
    additionalFiles: null,
    selectorName: null
  },
  'context-menu-component': {
    title: 'Context Menu Component',
    component: ContextMenuComponent,
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
  'confirm-dlg' : {
    title: 'Login Component',
    component: ConfirmDlgComponent,
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
  ContextMenuComponent,
  AboutusComponent,
  LoginComponent,
  ConfirmDlgComponent,
  PageNotFoundComponent
];

@NgModule({
  declarations: MY_COMPONENTS_LIST,
  entryComponents: MY_COMPONENTS_LIST,
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    ClientsModule,
    CcModule
  ],
  providers: [AdmUsersService
    , AuthService
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  } ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
