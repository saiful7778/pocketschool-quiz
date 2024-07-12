import { buttonVariants } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn";
import { Link } from "@tanstack/react-router";

interface NavlinkProps {
  path: string;
  navName: string;
}

const Navlink: React.FC<NavlinkProps> = ({ path, navName }) => (
  <Link
    to={path}
    className={cn(
      buttonVariants({ variant: "ghost", size: "sm" }),
      "w-full justify-start",
    )}
    activeProps={{ className: "bg-accent text-accent-foreground" }}
  >
    {navName}
  </Link>
);

export default Navlink;
