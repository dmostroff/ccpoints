import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'clients', loadChildren: 'app/clients/clients.module#ClientsModule' },
  { path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule
    , RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
