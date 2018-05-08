import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MaterialModule} from './material-module/material.module';
import {AppRoutingModule} from 'src/app/app-routing/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainContentComponent } from './main-content/main-content.component';
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    MainContentComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
