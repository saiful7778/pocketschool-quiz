import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils/shadcn";

interface LoadingProps {
  fullPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullPage }) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        fullPage && "h-screen",
      )}
    >
      <Spinner size={60} />
    </div>
  );
};

export default Loading;
