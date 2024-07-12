import { forwardRef } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";
import Button from "@/components/ui/button";
import Calendar from "@/components/ui/calendar";
import Popover from "@/components/ui/popover";
import type { InputProps } from "@/types/types";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";

interface DateTimePickerProp extends InputProps {
  label?: string;
  required?: boolean;
  value: string;
}

const DateTimePicker = forwardRef<HTMLButtonElement, DateTimePickerProp>(
  ({ label, required, placeholder, value, onChange }, ref) => {
    return (
      <FormItem>
        {label && (
          <div>
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          </div>
        )}
        <FormControl>
          <Popover>
            <Popover.trigger asChild>
              <FormControl>
                <Button
                  ref={ref}
                  variant="outline"
                  className={cn(
                    "w-full text-left font-normal",
                    !value && "text-muted-foreground",
                  )}
                >
                  {value ? format(value, "PPP") : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </Popover.trigger>
            <Popover.content className="w-auto p-0" align="start">
              <div className="px-3 pt-3">
                <Button>Click</Button>
              </div>
              <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                disabled={(date: Date) => {
                  console.log({
                    date,
                    nowDate: new Date().toISOString(),
                  });
                  return new Date() > date;
                }}
                initialFocus
              />
            </Popover.content>
          </Popover>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);
DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
