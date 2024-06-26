import { FC, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";
import Button from "@/components/ui/button";
import Command from "@/components/ui/command";
import Popover from "@/components/ui/popover";

interface ComboboxProps {
  placeholder: string;
  searchPlaceholder: string;
  emptyText: string;
  arrayData: string[];
}

const Combobox: FC<ComboboxProps> = ({
  placeholder,
  searchPlaceholder,
  emptyText,
  arrayData,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-56 justify-between"
        >
          {value ? arrayData.find((data) => data === value) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.trigger>
      <Popover.content className="w-56 p-0">
        <Command>
          <Command.input placeholder={searchPlaceholder} />
          <Command.list>
            <Command.empty>{emptyText}</Command.empty>
            <Command.group>
              {arrayData.map((data, idx) => (
                <Command.item
                  key={`${data} ${idx}`}
                  value={data}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {data}
                </Command.item>
              ))}
            </Command.group>
          </Command.list>
        </Command>
      </Popover.content>
    </Popover>
  );
};

export default Combobox;
