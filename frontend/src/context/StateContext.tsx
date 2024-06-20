import type { LayoutProps } from "@/types/layout";
import { FC, createContext, useState } from "react";

interface StateContextProps {
  classroomRole: "user" | "admin";
  setClassroomRole: React.Dispatch<React.SetStateAction<"user" | "admin">>;
}

export const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: FC<Readonly<LayoutProps>> = ({ children }) => {
  const [classroomRole, setClassroomRole] =
    useState<StateContextProps["classroomRole"]>("user");

  return (
    <StateContext.Provider value={{ classroomRole, setClassroomRole }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
