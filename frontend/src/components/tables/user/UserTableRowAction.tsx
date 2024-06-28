import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";
import UpdateUser from "./UpdateUser";
import type { User } from "@/types/user";

interface UserTableRowActionProps {
  id: string;
  role: User["role"];
  access: boolean;
}

const UserTableRowAction: FC<UserTableRowActionProps> = ({
  id,
  role,
  access,
}) => {
  return (
    <Dialog>
      <Dialog.trigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={18} />
          <span className="sr-only">Open user manage menu</span>
        </Button>
      </Dialog.trigger>
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.header>
          <Dialog.title>Edit user profile</Dialog.title>
        </Dialog.header>
        <UpdateUser id={id} role={role} access={access} />
      </Dialog.content>
    </Dialog>
  );
};

export default UserTableRowAction;
