import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import { getMessage } from './messages';
@Injectable()
export class NotifyService {
    private params: { timeOut: number; showProgressBar: boolean; pauseOnHover: boolean; clickToClose: boolean };
    private MESSAGES: object;
    constructor(private notif: NotificationsService) {
        this.MESSAGES = {};
        this.params = {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
        };
    }

    notify(data) {
        console.log(data);
        if (data.error) {
            this.notif.error(
                getMessage('error'),
                getMessage(data['code']),
                this.params
            );
        } else {
            this.notif.success(
                getMessage('success'),
                getMessage(data['code']),
                this.params
            );
        }
    }
}
