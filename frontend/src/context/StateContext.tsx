import type { LayoutProps } from "@/types/types";
import { FC, createContext, useState } from "react";

interface StateContextProps {
  classroomRole: "user" | "admin" | null;
  setClassroomRole: React.Dispatch<
    React.SetStateAction<"user" | "admin" | null>
  >;
  classroomDetailsLoading: boolean;
  setClassroomDetailsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: FC<Readonly<LayoutProps>> = ({ children }) => {
  const [classroomRole, setClassroomRole] = useState<
    StateContextProps["classroomRole"] | null
  >(null);
  const [classroomDetailsLoading, setClassroomDetailsLoading] =
    useState<boolean>(true);

  return (
    <StateContext.Provider
      value={{
        classroomRole,
        setClassroomRole,
        classroomDetailsLoading,
        setClassroomDetailsLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
