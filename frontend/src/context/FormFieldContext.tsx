import type { LayoutProps } from "@/types/types";
import { FC, createContext } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

interface FormFieldContextProviderProps<
  TName extends FieldPath<FieldValues> = FieldPath<FieldValues>,
> extends LayoutProps {
  name: TName;
}

const FormFieldContextProvider: FC<Readonly<FormFieldContextProviderProps>> = ({
  children,
  name,
}) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

export default FormFieldContextProvider;
