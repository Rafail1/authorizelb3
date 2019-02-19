import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import {MyUserApi} from "../../shared/sdk/services/custom";
import {Observable} from "rxjs";
import {CacheService} from "../cache.service";
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private myUserApi: MyUserApi, private cache: CacheService) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        const expectedRole = route.data.expectedRole;
        if (!this.auth.isAuthenticated()) {
            return false;
        } else {
            const key = this.myUserApi.getCurrentId() + 'roles';

            return new Observable<boolean>(observer => {
                if(this.cache.has(key)) {
                    this.cache.get(key).subscribe(data => {
                        observer.next(data.indexOf(expectedRole) !== -1);
                    })
                } else {
                    this.myUserApi.getMyRole().subscribe(data => {
                        this.cache.set(key, data);
                        observer.next(data.indexOf(expectedRole) !== -1);
                        observer.complete();
                    });
                }

            });

        }
    }
}
