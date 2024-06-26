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
import {
    RoutesCells,
    RoutesCellsFromJSON,
    RoutesCellsFromJSONTyped,
    RoutesCellsToJSON,
} from './';

/**
 * 
 * @export
 * @interface RoutesRowDataType
 */
export interface RoutesRowDataType {
    /**
     * 
     * @type {Array<RoutesCells>}
     * @memberof RoutesRowDataType
     */
    Cells?: Array<RoutesCells>;
    /**
     * 
     * @type {string}
     * @memberof RoutesRowDataType
     */
    RowType: string;
    /**
     * 
     * @type {Array<RoutesRowDataType>}
     * @memberof RoutesRowDataType
     */
    Rows?: Array<RoutesRowDataType>;
    /**
     * 
     * @type {string}
     * @memberof RoutesRowDataType
     */
    Title: string;
}

export function RoutesRowDataTypeFromJSON(json: any): RoutesRowDataType {
    return RoutesRowDataTypeFromJSONTyped(json, false);
}

export function RoutesRowDataTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoutesRowDataType {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'Cells': !exists(json, 'Cells') ? undefined : ((json['Cells'] as Array<any>).map(RoutesCellsFromJSON)),
        'RowType': json['RowType'],
        'Rows': !exists(json, 'Rows') ? undefined : ((json['Rows'] as Array<any>).map(RoutesRowDataTypeFromJSON)),
        'Title': json['Title'],
    };
}

export function RoutesRowDataTypeToJSON(value?: RoutesRowDataType | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Cells': value.Cells === undefined ? undefined : ((value.Cells as Array<any>).map(RoutesCellsToJSON)),
        'RowType': value.RowType,
        'Rows': value.Rows === undefined ? undefined : ((value.Rows as Array<any>).map(RoutesRowDataTypeToJSON)),
        'Title': value.Title,
    };
}


