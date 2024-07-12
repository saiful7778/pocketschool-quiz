import { Loader } from "lucide-react";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20 }) => {
  return (
    <span className="animate-spinner" role="status">
      <Loader size={size} />
    </span>
  );
};

export default Spinner;
