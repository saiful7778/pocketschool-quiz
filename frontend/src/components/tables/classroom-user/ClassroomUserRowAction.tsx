import Button from "@/components/ui/button";
import { MoreHorizontal, User, UserCog } from "lucide-react";
import { useState } from "react";
import UpdateClassroomUser from "./UpdateClassroomUser";
import DropdownMenu from "@/components/ui/dropdown-menu";

interface ClassroomUserRowActionProps {
  userId: string;
  email: string;
  classroomId: string;
  access: boolean;
  role: "user" | "admin";
}

const ClassroomUserRowAction: React.FC<ClassroomUserRowActionProps> = ({
  userId,
  email,
  role,
  access,
  classroomId,
}) => {
  const [userUpdateDialog, setUserUpdateDialog] = useState<boolean>(false);

  return (
    <>
      <UpdateClassroomUser
        open={userUpdateDialog}
        onOpenChange={setUserUpdateDialog}
        classroomId={classroomId}
        userId={userId}
        currentUserEmail={email}
        access={access}
        role={role}
      />
      <DropdownMenu>
        <DropdownMenu.trigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal size={18} />
            <span className="sr-only">open classroom user manage menu</span>
          </Button>
        </DropdownMenu.trigger>
        <DropdownMenu.content align="end" forceMount>
          <DropdownMenu.label>Manage user</DropdownMenu.label>
          <DropdownMenu.separator />
          <DropdownMenu.item>
            <User size={16} strokeWidth={1} /> <span>User Details</span>
          </DropdownMenu.item>
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

export default ClassroomUserRowAction;
