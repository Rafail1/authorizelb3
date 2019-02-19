import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyUserApi} from "../../shared/sdk/services/custom";
@Injectable()
export class RegisterService {
    constructor(public http: HttpClient, private myUserApi: MyUserApi) {}
    register(body) {
        return this.myUserApi.create(body);
    }
    resend(email) {
        return this.myUserApi.resend(email);
    }

    confirm(param: { access_token: any, uid:any }) {
        return this.myUserApi.confirm(param.uid, param.access_token, null);

    }
}
