import { Skeleton } from "../ui/skeleton";

type LoadingTableProps = {
  rows?: number;
};

const LoadingTable = ({ rows = 5 }: LoadingTableProps) => {
  const tableRow = Array.from({ length: rows }, (_, index) => {
    return (
      <div className="mb-4" key={index}>
        <Skeleton className="w-full h-8 rounded" />
      </div>
    );
  });

  return <>{tableRow}</>;
};

export default LoadingTable;
