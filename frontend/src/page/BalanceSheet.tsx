import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/Table';
import { TableSkeleton } from '../components/TableSkeleton';
import { cn } from '../utills/tailwindMerge';
import { ReportType, RowDataType } from './types';

const apiUrl = `http://localhost:4000/balance-sheet`;
function TableContent({
  title,
  rows,
  numberOfColumns,
}: {
  numberOfColumns: number;
  title?: string;
  rows?: RowDataType[];
}) {
  const summaryRow = rows?.find((row) => row.RowType === 'SummaryRow');

  return (
    <>
      <TableRow>
        <TableCell
          className="font-semibold text-md"
          data-testid="tableCellHeaderId"
        >
          {title}
        </TableCell>
        {!rows || rows?.length === 0 ? (
          <>
            {Array.from({ length: numberOfColumns }).map((_, index) => (
              <TableCell
                key={`${title}${index}`}
                className="font-semibold text-md text-gray-700"
                data-testid="tableCellHeaderNoDataId"
              >
                No data
              </TableCell>
            ))}
          </>
        ) : null}
      </TableRow>
      {rows
        ?.filter((row) => row.RowType !== 'SummaryRow')
        .map((row, index) => {
          return (
            <TableRow key={`${row.Title}${index}`} data-testid="tableRowDataId">
              {row.Cells?.map((cell, cellIndex) => (
                <TableCell
                  key={`${cell.Value}${cellIndex}`}
                  className={cn({ 'pl-8': cellIndex === 0 })}
                >
                  {cell.Value}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      <TableRow data-testid="tableRowSummaryDataId">
        {summaryRow?.Cells?.map((cell, index) => (
          <TableCell
            key={cell.Value + index}
            className={cn('font-semibold text-gray-900', {
              'pl-8': index === 0,
            })}
          >
            {cell.Value}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}

const useGetBalanceSheet = () => {
  return useSuspenseQuery({
    queryKey: ['balance-sheet'],
    queryFn: async () => {
      const res = await fetch(apiUrl);
      const data = (await res.json()) as ReportType;
      if (!data?.Reports || !data?.Reports.length) {
        return {} as ReportType['Reports'][0];
      }
      return data.Reports[0];
    },
  });
};
function RenderSheet() {
  const { error, data } = useGetBalanceSheet();
  const [title, company, date] = data.ReportTitles;
  const header = data.Rows[0];
  const body = data.Rows.slice(1) as RowDataType[];

  if (error) {
    return (
      <div className="text-orange-600 text-2xl grid items-center justify-center w-full">
        <p className="font-bold">Error occured, please try later</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <data className="text-gray-900 text-l">{company}</data>
        <data className="text-gray-900 ml-2">{date}</data>
      </section>
      <section className="mt-4">
        <Table>
          <TableHeader>
            {header?.Cells?.map((cell) => {
              if (cell.Value === '') {
                return (
                  <TableHead key={cell.Value} className="w-[400px]">
                    {cell.Value || title}
                  </TableHead>
                );
              }
              return <TableHead key={cell.Value}>{cell.Value}</TableHead>;
            })}
          </TableHeader>
          <TableBody>
            {body.map((row, index) => {
              return (
                <TableContent
                  key={`${row.Title}${index}`}
                  rows={row.Rows}
                  title={row.Title}
                  numberOfColumns={
                    header?.Cells?.length ? header?.Cells?.length - 1 : 0
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

export default function BalanceSheet() {
  return (
    <Suspense fallback={<TableSkeleton rows={5} />}>
      <RenderSheet />
    </Suspense>
  );
}
