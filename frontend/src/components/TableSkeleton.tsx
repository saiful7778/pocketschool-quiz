import Skeleton from "./ui/skeleton";

const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-4">
        <Skeleton className="mr-auto h-[36px] w-[295px]" />
        <Skeleton className="h-[36px] w-[42px]" />
        <Skeleton className="h-[36px] w-[62px]" />
      </div>
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="h-[40px] w-full" />
      <Skeleton className="h-[40px] w-full" />
    </div>
  );
};

export default TableSkeleton;
