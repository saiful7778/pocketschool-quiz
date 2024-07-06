import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";
import UpdateClassroomUser from "./UpdateClassroomUser";

interface ClassroomUserRowActionProps {
  userId: string;
  email: string;
  classroomId: string;
  access: boolean;
  role: "user" | "admin";
}

const ClassroomUserRowAction: FC<ClassroomUserRowActionProps> = ({
  userId,
  email,
  role,
  access,
  classroomId,
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
          <Dialog.title>Edit user</Dialog.title>
        </Dialog.header>
        <UpdateClassroomUser
          classroomId={classroomId}
          userId={userId}
          currentUserEmail={email}
          access={access}
          role={role}
        />
      </Dialog.content>
    </Dialog>
  );
};

export default ClassroomUserRowAction;
