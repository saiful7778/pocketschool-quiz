import { type ContextProps } from "@/types/context";
import { FC, createContext } from "react";

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

interface FormItemContextProviderProps extends ContextProps {
  id: string;
}

const FormItemContextProvider: FC<FormItemContextProviderProps> = ({
  children,
  id,
}) => {
  return (
    <FormItemContext.Provider value={{ id }}>
      {children}
    </FormItemContext.Provider>
  );
};

export default FormItemContextProvider;
