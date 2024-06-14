import { type InputProps } from "@/types/inputProps";
import { forwardRef } from "react";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";

interface InputFieldProps extends InputProps {
  label?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, label, required, ...props }, ref) => {
    return (
      <Form.item>
        {label && (
          <Form.label>
            {label} {required && <span className="text-destructive">*</span>}
          </Form.label>
        )}
        <Form.control>
          <Input ref={ref} className={className} type={type} {...props} />
        </Form.control>
        <Form.message />
      </Form.item>
    );
  },
);
InputField.displayName = "InputField";

export default InputField;
