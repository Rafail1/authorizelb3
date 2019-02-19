/* tslint:disable */

declare var Object: any;
export interface MyAccessTokenInterface {
  "id"?: string;
  "ttl"?: number;
  "scopes"?: Array<any>;
  "created"?: Date;
  "userId"?: any;
  "principalType"?: string;
  user?: any;
  myUser?: any;
}

export class MyAccessToken implements MyAccessTokenInterface {
  "id": string;
  "ttl": number;
  "scopes": Array<any>;
  "created": Date;
  "userId": any;
  "principalType": string;
  user: any;
  myUser: any;
  constructor(data?: MyAccessTokenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MyAccessToken`.
   */
  public static getModelName() {
    return "MyAccessToken";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MyAccessToken for dynamic purposes.
  **/
  public static factory(data: MyAccessTokenInterface): MyAccessToken{
    return new MyAccessToken(data);
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
      name: 'MyAccessToken',
      plural: 'MyAccessTokens',
      path: 'MyAccessTokens',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "ttl": {
          name: 'ttl',
          type: 'number',
          default: 1209600
        },
        "scopes": {
          name: 'scopes',
          type: 'Array&lt;any&gt;'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "principalType": {
          name: 'principalType',
          type: 'string'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        myUser: {
          name: 'myUser',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
