import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {RegisterComponent} from "src/app/register/register.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "src/app/services/auth-guard.service";
import {MainContentComponent} from "src/app/main-content/main-content.component";

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainContentComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
