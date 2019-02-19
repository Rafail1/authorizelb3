import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {NotAuthGuardService} from "../services/auth/not-auth-guard.service";
import {RegisterComponent} from "./register/register.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
    }, {
      path: 'login',
      component: LoginComponent,
      canActivate: [NotAuthGuardService]
    },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'confirm/:access_token/:uid',
    component: ConfirmComponent,
    canActivate: [NotAuthGuardService]
  },

  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'password-reset/:access_token',
    component: PasswordResetComponent,
    canActivate: [NotAuthGuardService]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
