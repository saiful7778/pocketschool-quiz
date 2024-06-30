import { buttonVariants } from "@/lib/styles";
import { cn } from "@/lib/utils/shadcn";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

interface NavlinkProps {
  path: string;
  navName: string;
}

const Navlink: FC<NavlinkProps> = ({ path, navName }) => (
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
