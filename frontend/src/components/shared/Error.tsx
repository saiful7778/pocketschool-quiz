import Button from "@/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import { FC } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
  fullPage?: boolean;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset, fullPage }) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        fullPage && "h-screen",
      )}
    >
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-bold">
          Something went wrong<span className="text-destructive">!</span>
        </h3>
        <pre>
          <code>{error.message}</code>
        </pre>
        <Button onClick={reset} variant="destructive">
          Refrash
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
