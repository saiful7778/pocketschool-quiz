import { dashboardLinks } from "@/lib/staticData";
import useAuth from "@/hooks/useAuth";
import Separator from "@/components/ui/separator";
import Navlink from "../Navlink";
import DropdownMenu from "../ui/dropdown-menu";
import Button from "../ui/button";
import { SquareMenuIcon } from "lucide-react";

const Sidebar: React.FC = () => {
  const { userData } = useAuth();

  return (
    <aside className="w-full max-w-40">
      <div className="lg:hidden">
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
        className="flex flex-col gap-2 text-sm text-muted-foreground max-lg:hidden"
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

export default Sidebar;
