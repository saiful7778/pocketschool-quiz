import { FC, ReactNode } from "react";
import Dialog from "./ui/dialog";
import Button from "./ui/button";
import Spinner from "./Spinner";

interface DeleteConfirmProps {
  trigger?: ReactNode;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  description?: string;
  isConfirm: boolean;
  confirmClick: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const DeleteConfirm: FC<DeleteConfirmProps> = ({
  trigger,
  open,
  onOpenChange,
  description,
  isConfirm,
  confirmClick,
  confirmButtonText = "Yes, Delete!",
  cancelButtonText = "Cancel",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {typeof trigger !== "undefined" && (
        <Dialog.trigger asChild>{trigger}</Dialog.trigger>
      )}
      <Dialog.content className="w-full sm:max-w-md">
        <Dialog.title className="text-center text-2xl">
          Do you want to delete this?
        </Dialog.title>
        {description && (
          <Dialog.description className="text-center">
            {description}
          </Dialog.description>
        )}
        <Dialog.description className="text-center">
          Click cancel button to cancel this process
        </Dialog.description>

        <Dialog.footer className="!justify-center gap-2">
          <Dialog.close asChild>
            <Button variant="outline" size="sm">
              {cancelButtonText}
            </Button>
          </Dialog.close>
          <Button onClick={confirmClick} variant="destructive" size="sm">
            {isConfirm ? <Spinner size={20} /> : confirmButtonText}
          </Button>
        </Dialog.footer>
      </Dialog.content>
    </Dialog>
  );
};

export default DeleteConfirm;
