import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import {MeComponent} from "./me/me.component";

@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
