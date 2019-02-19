import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../../services/auth/register.service';
import {NotifyService} from '../../services/notify.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    password: string;
    passwordConfirm: string;
    email: string;
    name: string;
    loading: boolean;
    message: string;
    constructor(private http: HttpClient, private notify: NotifyService, private rService: RegisterService, private router: Router) {
    }

    register() {
        this.loading = true;
        this.rService.register({
            email: this.email,
            name: this.name,
            password: this.password
        }).subscribe(data => {
            this.loading = false;
            this.notify.notify(data);
            this.router.navigate(['/auth/login']);
        }, error => {
            this.loading = false;
            this.notify.notify(error);
        });
    }


    ngOnInit() {
    }

}
