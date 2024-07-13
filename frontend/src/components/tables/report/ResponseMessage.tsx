import Dialog from "@/components/ui/dialog";
import type { ElementOpenProps } from "@/types";

interface ResponseMessageProps extends ElementOpenProps {
  response?: string;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({
  open,
  onOpenChange,
  response,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content>
        <Dialog.header>
          <Dialog.title>Response details</Dialog.title>
        </Dialog.header>
        <p>{response || "No response from developer"}</p>
      </Dialog.content>
    </Dialog>
  );
};

export default ResponseMessage;
