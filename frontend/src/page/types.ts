export interface ReportType {
  Reports: {
    ReportTitles: Array<string>;
    Rows: RowDataType[] | HeaderDataType[];
  }[];
}
export interface RowDataType {
  RowType: 'Section' | 'Row' | 'SummaryRow';
  Title: string;
  Cells?: ICells[];
  Rows?: RowDataType[];
}
export interface HeaderDataType {
  RowType: 'Header';
  Cells: ICells[];
}
export interface ICells {
  Value: string;
}
