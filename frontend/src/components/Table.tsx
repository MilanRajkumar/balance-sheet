import { HTMLProps } from 'react';

import { cn } from '../utills/tailwindMerge';

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="overflow-hidden rounded-md border-separate border-spacing-x-0 border border-slate-200  table-auto w-full text-sm">
      {children}
    </table>
  );
}

export function TableRow({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <tr className="w-full" data-testid="tableRowId" {...rest}>
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  colSpan,
  className,
  ...rest
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: HTMLProps<HTMLElement>['className'];
}) {
  return (
    <td
      className={cn(
        'min-w-[200px] border border-slate-100 table-cell px-4 py-2',
        className,
      )}
      colSpan={colSpan}
      data-testid="tableCellId"
      {...rest}
    >
      {children}
    </td>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead data-testid="tableHeaderId">
      <tr className="bg-slate-100">{children}</tr>
    </thead>
  );
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: HTMLProps<HTMLElement>['className'];
}) {
  return (
    <th
      className={cn('border-b font-medium text-left p-4 pb-3', className)}
      data-testid="tableHeadId"
    >
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="w-full">{children}</tbody>;
}
