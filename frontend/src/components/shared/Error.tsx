import Button from "@/components/ui/button";
import { FC } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-bold">
          Something went wrong<span className="text-red-600">!</span>
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
