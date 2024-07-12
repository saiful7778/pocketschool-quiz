import Button from "@/components/ui/button";
import { MoreHorizontal, UserCog } from "lucide-react";
import UpdateUser from "./UpdateUser";
import type { UserType } from "@/types";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface UserTableRowActionProps {
  id: string;
  role: UserType["role"];
  access: boolean;
}

const UserTableRowAction: React.FC<UserTableRowActionProps> = ({
  id,
  role,
  access,
}) => {
  const [userUpdateDialog, setUserUpdateDialog] = useState<boolean>(false);

  return (
    <>
      <UpdateUser
        id={id}
        role={role}
        access={access}
        open={userUpdateDialog}
        onOpenChange={setUserUpdateDialog}
      />
      <DropdownMenu>
        <DropdownMenu.trigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal size={18} />
            <span className="sr-only">open user manage menu</span>
          </Button>
        </DropdownMenu.trigger>
        <DropdownMenu.content align="end" forceMount>
          <DropdownMenu.label>Manage user</DropdownMenu.label>
          <DropdownMenu.separator />
          <DropdownMenu.item
            onClick={() => setUserUpdateDialog((prev) => !prev)}
          >
            <UserCog size={16} strokeWidth={1} /> <span>Update User</span>
          </DropdownMenu.item>
        </DropdownMenu.content>
      </DropdownMenu>
    </>
  );
};

export default UserTableRowAction;
