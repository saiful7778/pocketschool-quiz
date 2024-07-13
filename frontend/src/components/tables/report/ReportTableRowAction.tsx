import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import {
  MessageSquareReply,
  MoreHorizontal,
  PencilLine,
  ReceiptText,
} from "lucide-react";
import ReportMessage from "./ReportMessage";
import { useState } from "react";
import ResponseMessage from "./ResponseMessage";
import useAuth from "@/hooks/useAuth";
import AddResponse from "./AddResponse";

interface ReportTableRowActionProps {
  reportId: string;
  message: string;
  response?: string;
}

const ReportTableRowAction: React.FC<ReportTableRowActionProps> = ({
  reportId,
  message,
  response,
}) => {
  const [messageDialog, setMessageDialog] = useState<boolean>(false);
  const [responseDialog, setResponseDialog] = useState<boolean>(false);
  const [addResponse, setAddResponse] = useState<boolean>(false);
  const { userData } = useAuth();

  return (
    <>
      <ReportMessage
        message={message}
        open={messageDialog}
        onOpenChange={setMessageDialog}
      />
      <ResponseMessage
        response={response}
        open={responseDialog}
        onOpenChange={setResponseDialog}
      />
      {userData?.role === "superAdmin" && (
        <AddResponse
          reportId={reportId}
          open={addResponse}
          onOpenChange={setAddResponse}
        />
      )}
      <DropdownMenu>
        <DropdownMenu.trigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal size={18} />
            <span className="sr-only">open report menu</span>
          </Button>
        </DropdownMenu.trigger>
        <DropdownMenu.content align="end" forceMount>
          <DropdownMenu.item onClick={() => setMessageDialog((prev) => !prev)}>
            <ReceiptText size={16} strokeWidth={1} /> <span>Details</span>
          </DropdownMenu.item>
          <DropdownMenu.separator />
          <DropdownMenu.item onClick={() => setResponseDialog((prev) => !prev)}>
            <MessageSquareReply size={16} strokeWidth={1} />
            <span>Response</span>
          </DropdownMenu.item>
          {userData?.role === "superAdmin" && (
            <>
              <DropdownMenu.separator />
              <DropdownMenu.item
                onClick={() => setAddResponse((prev) => !prev)}
              >
                <PencilLine size={16} strokeWidth={1} />
                <span>Add response</span>
              </DropdownMenu.item>
            </>
          )}
        </DropdownMenu.content>
      </DropdownMenu>
    </>
  );
};

export default ReportTableRowAction;
