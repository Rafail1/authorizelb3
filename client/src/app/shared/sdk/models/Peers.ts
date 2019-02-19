/* tslint:disable */
import {
  Telegram
} from '../index';

declare var Object: any;
export interface PeersInterface {
  "from": any;
  "to": any;
  "params"?: any;
  "id"?: any;
  "telegramId"?: any;
  telegram?: Telegram;
}

export class Peers implements PeersInterface {
  "from": any;
  "to": any;
  "params": any;
  "id": any;
  "telegramId": any;
  telegram: Telegram;
  constructor(data?: PeersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Peers`.
   */
  public static getModelName() {
    return "Peers";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Peers for dynamic purposes.
  **/
  public static factory(data: PeersInterface): Peers{
    return new Peers(data);
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
      name: 'Peers',
      plural: 'Peers',
      path: 'Peers',
      idName: 'id',
      properties: {
        "from": {
          name: 'from',
          type: 'any'
        },
        "to": {
          name: 'to',
          type: 'any'
        },
        "params": {
          name: 'params',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "telegramId": {
          name: 'telegramId',
          type: 'any'
        },
      },
      relations: {
        telegram: {
          name: 'telegram',
          type: 'Telegram',
          model: 'Telegram',
          relationType: 'belongsTo',
                  keyFrom: 'telegramId',
          keyTo: 'id'
        },
      }
    }
  }
}
