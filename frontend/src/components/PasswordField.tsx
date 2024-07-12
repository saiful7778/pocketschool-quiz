import type { InputProps } from "@/types";
import { forwardRef, useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputProps {
  label?: string;
}

const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, disabled, ...props }, ref) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
      <FormItem>
        {label && (
          <FormLabel>
            {label} <span className="text-destructive">*</span>
          </FormLabel>
        )}
        <FormControl>
          <div className="relative">
            <Input
              ref={ref}
              className={className}
              type={showPass ? "text" : "password"}
              disabled={disabled}
              {...props}
            />
            <div className="absolute right-2 top-[15%]">
              <Button
                onClick={() => setShowPass((prop) => !prop)}
                type="button"
                className="size-7"
                size="icon"
                variant="ghost"
                disabled={disabled}
              >
                {showPass ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);
PasswordField.displayName = "PasswordField";

export default PasswordField;
