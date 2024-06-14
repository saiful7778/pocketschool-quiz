import { type InputProps } from "@/types/inputProps";
import { forwardRef, useState } from "react";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputProps {
  label?: string;
}

const PasswordField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, ...props }, ref) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    return (
      <Form.item>
        {label && (
          <Form.label>
            {label} <span className="text-destructive">*</span>
          </Form.label>
        )}
        <Form.control>
          <div className="relative">
            <Input
              ref={ref}
              className={className}
              type={showPass ? "text" : "password"}
              {...props}
            />
            <div className="absolute right-2 top-[15%]">
              <Button
                onClick={() => setShowPass((prop) => !prop)}
                type="button"
                size="icon"
                variant="ghost"
              >
                {showPass ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </div>
        </Form.control>
        <Form.message />
      </Form.item>
    );
  },
);
PasswordField.displayName = "PasswordField";

export default PasswordField;
