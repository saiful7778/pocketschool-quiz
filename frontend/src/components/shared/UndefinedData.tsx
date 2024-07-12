import { FC } from "react";

const UndefinedData: FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-bold">
          data is unavailable <span className="text-destructive">!</span>
        </h3>
      </div>
    </div>
  );
};

export default UndefinedData;
