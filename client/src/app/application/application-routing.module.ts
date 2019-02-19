import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MeComponent} from "./me/me.component";

const routes: Routes = [ {
  path: '',
  component: MeComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
