/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { Telegram } from '../../models/Telegram';
import { Peers } from '../../models/Peers';
import { MyUser } from '../../models/MyUser';
import { MyAccessToken } from '../../models/MyAccessToken';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    Telegram: Telegram,
    Peers: Peers,
    MyUser: MyUser,
    MyAccessToken: MyAccessToken,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
