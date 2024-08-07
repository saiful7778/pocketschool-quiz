import type { LayoutProps } from "@/types";
import { createContext } from "react";

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

interface FormItemContextProviderProps extends LayoutProps {
  id: string;
}

const FormItemContextProvider: React.FC<
  Readonly<FormItemContextProviderProps>
> = ({ children, id }) => {
  return (
    <FormItemContext.Provider value={{ id }}>
      {children}
    </FormItemContext.Provider>
  );
};

export default FormItemContextProvider;
