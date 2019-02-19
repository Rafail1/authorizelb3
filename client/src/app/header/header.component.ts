import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MyUserApi} from "../shared/sdk/services/custom";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    currentUrl: string;
    menu: any;

    constructor(private router: Router, private myUserApi: MyUserApi) {
        this.menu = [
            {url: '/auth/login', active: false, name: 'Авторизация'},
            {url: '/auth/register', active: false, name: 'Регистрация'}
        ];
    }

    ngOnInit() {
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
            }
        });
    }

    logout() {
        this.myUserApi.logout().subscribe(data => {
            this.router.navigate(['/']);
        }, error => {
            console.log(error);
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
