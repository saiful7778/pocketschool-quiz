import Button from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const NotFound: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-90px)] w-full items-center justify-center">
      <div className="space-y-3 text-center">
        <h3 className="text-3xl font-bold">404! not found</h3>
        <Button asChild>
          <Link to="/">go to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
