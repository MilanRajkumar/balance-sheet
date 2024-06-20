import {
  RoutesCells,
  RoutesReportsType,
  RoutesRowDataType,
} from '../api/generated';

export interface ReportType extends RoutesReportsType {}
export interface RowDataType extends RoutesRowDataType {}
export interface HeaderDataType {
  RowType: 'Header';
  Cells: RoutesCells[];
}
