import { FC } from "react";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Button from "@/components/ui/button";
import { SquareMenuIcon } from "lucide-react";
import { dashboardLinks } from "@/lib/staticData";
import useAuth from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils/shadcn";
import { buttonVariants } from "@/lib/styles";
import Separator from "@/components/ui/separator";

const Sidebar: FC = () => {
  const { userData } = useAuth();

  return (
    <aside className="w-full max-w-40">
      <div className="flex-1 md:hidden">
        <DropdownMenu>
          <DropdownMenu.trigger asChild>
            <Button variant="outline" size="icon">
              <SquareMenuIcon size={20} />
              <span className="sr-only">sidebar menu</span>
            </Button>
          </DropdownMenu.trigger>
          <DropdownMenu.content align="end">
            {dashboardLinks.map((ele, idx) => (
              <DropdownMenu.item key={"dashboard-menu-link" + idx} asChild>
                <Navlink path={ele.path} navName={ele.navName} />
              </DropdownMenu.item>
            ))}
            <DropdownMenu.separator />
            <DropdownMenu.item asChild>
              <Navlink path="/profile" navName="Profile" />
            </DropdownMenu.item>
          </DropdownMenu.content>
        </DropdownMenu>
      </div>
      <nav
        className="flex flex-col gap-2 text-sm text-muted-foreground max-md:hidden"
        x-chunk="dashboard-04-chunk-0"
      >
        {dashboardLinks.map((ele, idx) => {
          if (userData?.role === "superAdmin") {
            return (
              <Navlink
                key={"dashboard-link" + idx}
                path={ele.path}
                navName={ele.navName}
              />
            );
          } else if (
            userData?.role === "admin" &&
            (ele.access === "user" || ele.access === "admin")
          ) {
            return (
              <Navlink
                key={"dashboard-link" + idx}
                path={ele.path}
                navName={ele.navName}
              />
            );
          } else if (userData?.role === "user" && ele.access === "user") {
            return (
              <Navlink
                key={"dashboard-link" + idx}
                path={ele.path}
                navName={ele.navName}
              />
            );
          }
        })}
        <Separator />
        <Navlink path="/profile" navName="Profile" />
      </nav>
    </aside>
  );
};

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

export default Sidebar;
