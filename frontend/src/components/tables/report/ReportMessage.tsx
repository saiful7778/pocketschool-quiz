import Dialog from "@/components/ui/dialog";
import type { ElementOpenProps } from "@/types";

interface ReportMessageProps extends ElementOpenProps {
  message: string;
}

const ReportMessage: React.FC<ReportMessageProps> = ({
  message,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content>
        <Dialog.header>
          <Dialog.title>Report message</Dialog.title>
        </Dialog.header>
        <p>{message}</p>
      </Dialog.content>
    </Dialog>
  );
};

export default ReportMessage;
