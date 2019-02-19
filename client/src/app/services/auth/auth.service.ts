
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyUserApi} from "../../shared/sdk/services/custom";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient ,private myUserApi: MyUserApi) {}

    public isAuthenticated(): boolean {
        return this.myUserApi.isAuthenticated();
    }

    public resetPassword(email) {
        return this.myUserApi.resetPasswordSend(email);
    }

    public changePassword(options) {
        return this.myUserApi.resetMyPassword(options);

    }

    public login(options) {
        return this.myUserApi.login(options);
    }

}
