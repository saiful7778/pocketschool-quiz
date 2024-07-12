import Button from "@/components/ui/button";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ReceiptText } from "lucide-react";

const QuizParticipantRowAction: React.FC = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenu.trigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal size={18} />
            <span className="sr-only">open quiz manage menu</span>
          </Button>
        </DropdownMenu.trigger>
        <DropdownMenu.content align="end" forceMount>
          <DropdownMenu.item>
            <ReceiptText size={16} strokeWidth={1} /> <span>Details</span>
          </DropdownMenu.item>
        </DropdownMenu.content>
      </DropdownMenu>
    </>
  );
};

export default QuizParticipantRowAction;
