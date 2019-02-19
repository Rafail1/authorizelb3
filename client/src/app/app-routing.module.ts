import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuardService as AuthGuard} from './services/auth/auth-guard.service';
import {RoleGuardService as RoleGuard} from './services/auth/role-guard.service';
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [

  {
    path: 'app',
    loadChildren: './application/application.module#ApplicationModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './authorization/authorization.module#AuthorizationModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },

  { path: '**',  component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
