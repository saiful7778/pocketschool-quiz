import { FC } from "react";
import SiteLogo from "@/components/SiteLogo";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import UserDropdown from "@/components/UserDropdown";

const Navbar: FC = () => {
  const { user } = useAuth();
  return (
    <nav className="flex items-center justify-between gap-2 border-b pb-2">
      <SiteLogo />
      <div>
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
