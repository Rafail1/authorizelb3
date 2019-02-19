import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from '../../services/notify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
    email;
    access_token;
    passwordConfirm;
    loading: boolean;
    password;
    private sub: Subscription;
    constructor(private authService: AuthService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) { }

    resetPassword() {
        this.loading = true;
        this.authService.resetPassword(this.email).subscribe(data => {
            this.loading = false;
            this.notify.notify(data);
        }, error => {
            this.loading = false;
            this.notify.notify(error);
        });
    }

    changePassword() {
        this.loading = true;
        this.authService.changePassword({
            access_token: this.access_token,
            newPassword: this.password,
        }).subscribe(data => {
            this.loading = false;
            if (!data['error']) {
                this.router.navigate(['/auth/login']);
            }
            this.notify.notify(data);
        }, error => {
            this.loading = false;
        });
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.access_token = params['access_token'];
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
