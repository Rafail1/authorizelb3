/* tslint:disable */
import {
  Peers
} from '../index';

declare var Object: any;
export interface TelegramInterface {
  "api_id": number;
  "api_hash": string;
  "phone_number": string;
  "storage"?: any;
  "id"?: any;
  peers?: Peers[];
}

export class Telegram implements TelegramInterface {
  "api_id": number;
  "api_hash": string;
  "phone_number": string;
  "storage": any;
  "id": any;
  peers: Peers[];
  constructor(data?: TelegramInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Telegram`.
   */
  public static getModelName() {
    return "Telegram";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Telegram for dynamic purposes.
  **/
  public static factory(data: TelegramInterface): Telegram{
    return new Telegram(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Telegram',
      plural: 'Telegrams',
      path: 'Telegrams',
      idName: 'id',
      properties: {
        "api_id": {
          name: 'api_id',
          type: 'number'
        },
        "api_hash": {
          name: 'api_hash',
          type: 'string'
        },
        "phone_number": {
          name: 'phone_number',
          type: 'string'
        },
        "storage": {
          name: 'storage',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        peers: {
          name: 'peers',
          type: 'Peers[]',
          model: 'Peers',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'telegramId'
        },
      }
    }
  }
}
