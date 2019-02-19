import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AuthorizationRoutingModule} from './authorization-routing.module';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {PassValidator} from "../directives/password-validator.directive";
import {EqualValidator} from "../directives/equal-validator.directive";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ConfirmComponent,
        PasswordResetComponent,
        PassValidator,
        EqualValidator
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthorizationRoutingModule
    ]
})
export class AuthorizationModule {
}
