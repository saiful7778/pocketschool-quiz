import { FC } from "react";
import { ImSpinner9 } from "react-icons/im";

interface SpinnerProps {
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ size = 20 }) => {
  return (
    <span className="animate-spinner" role="status">
      <ImSpinner9 size={size} />
    </span>
  );
};

export default Spinner;
