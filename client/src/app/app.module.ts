import { AppRoutingModule } from './app-routing.module';

import { SDKBrowserModule } from './shared/sdk';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppComponent } from './app.component';


import {AuthGuardService as AuthGuard} from './services/auth/auth-guard.service';
import {NotAuthGuardService} from './services/auth/not-auth-guard.service';

import {AuthService} from './services/auth/auth.service';
import {GlobalErrorHandler} from './interceptors/global-error-handler';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {RegisterService} from './services/auth/register.service';
import {NotifyService} from './services/notify.service';
import {SimpleNotificationsModule} from "angular2-notifications";
import { HeaderComponent } from './header/header.component';
import {RoleGuardService} from "./services/auth/role-guard.service";
import { NotFoundComponent } from './not-found/not-found.component';
import {CacheService} from "./services/cache.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SDKBrowserModule.forRoot(),
      SimpleNotificationsModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, NotifyService, RegisterService, NotAuthGuardService, RoleGuardService,CacheService, {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}

