import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/auth/register.service';
import {NotifyService} from '../../services/notify.service';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    unconfirmed: boolean;
    password: string;
    logging: boolean;
    resending: boolean;


    constructor(private rService: RegisterService, private authService: AuthService, private router: Router, private notif: NotifyService) {
    }

    ngOnInit() {
    }

    login() {
        this.logging = true;
        this.authService.login({
            email: this.email,
            password: this.password,
        }).subscribe(data => {
                this.logging = false;
                if (data.id) {
                    this.router.navigate(['/app']);
                    this.notif.notify({message: 'добро пожаловать!)'});
                }
            }, error => {
                this.logging = false;
                if (error.code === 'email_not_verified') {
                    this.unconfirmed = true;
                }
                this.notif.notify(error);
            }
        );
    }

    resend() {
        this.resending = true;
        this.rService.resend(this.email).subscribe(data => {
            this.resending = false;
            this.notif.notify(data);
        }, error => {
            this.resending = false;
            this.notif.notify(error);
        });
    }

}
