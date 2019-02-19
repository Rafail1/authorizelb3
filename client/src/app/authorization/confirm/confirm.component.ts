import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from "../../services/auth/register.service";
import {NotifyService} from "../../services/notify.service";

@Component({
    selector: 'app-confirm',
    template: '',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy {
    private sub: any;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private regService: RegisterService,
                private notify: NotifyService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (!params['access_token'] || !params['uid']) {
                this.router.navigate(['/auth/app']);
                return;
            }
            this.regService.confirm({access_token: params['access_token'], uid: params['uid']})
                .subscribe(data => {
                    this.notify.notify(data);
                    this.router.navigate(['/auth/login']);
                }, err => {
                    this.notify.notify(err);
                    this.router.navigate(['/auth/login']);
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
