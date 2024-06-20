/* tslint:disable */
/* eslint-disable */
/**
 * Milan API
 * Milan openapi description
 *
 * The version of the OpenAPI document: v1
 * Contact: rkmilansingh@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RoutesCells
 */
export interface RoutesCells {
    /**
     * 
     * @type {string}
     * @memberof RoutesCells
     */
    Value: string;
}

export function RoutesCellsFromJSON(json: any): RoutesCells {
    return RoutesCellsFromJSONTyped(json, false);
}

export function RoutesCellsFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoutesCells {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'Value': json['Value'],
    };
}

export function RoutesCellsToJSON(value?: RoutesCells | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Value': value.Value,
    };
}

