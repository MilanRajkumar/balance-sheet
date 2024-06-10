import { cn } from '../utills/tailwindMerge';

const Skeleton = () => {
  return (
    <div className={cn('w-full h-full opacity-50 px-4 py-4')}>
      <div className={cn('bg-[#939A9F] rounded-md h-4')}></div>
    </div>
  );
};

export const TableSkeleton = ({ rows }: { rows: number }) => {
  return (
    <div
      className={cn(
        'overflow-x-auto overflow-y-hidden rounded-md border border-slate-100',
      )}
      data-testid="tableSkeletonId"
    >
      {Array.from({ length: rows }).map((_, index) => {
        return <Skeleton key={index} />;
      })}
    </div>
  );
};
