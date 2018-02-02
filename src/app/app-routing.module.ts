import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus.component';
import { CcCompanyComponent } from './cc/cc-company.component';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'clients', loadChildren: './clients/clients.module#ClientsModule' },
  { path: 'cc', loadChildren: './cc/cc.module#CcModule' },
  { path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
  //, { path: '/', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule
    , RouterModule.forRoot(appRoutes
    , { enableTracing: false }
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
