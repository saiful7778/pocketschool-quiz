import type { LayoutProps } from "@/types";
import { createContext, useState } from "react";

interface StateContextProps {
  classroomRole: "user" | "admin" | null;
  handleClassroomRole: (role: "user" | "admin" | null) => void;
  classroomDetailsLoading: boolean;
  setClassroomDetailsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<Readonly<LayoutProps>> = ({
  children,
}) => {
  const [classroomRole, setClassroomRole] = useState<
    StateContextProps["classroomRole"] | null
  >(null);
  const [classroomDetailsLoading, setClassroomDetailsLoading] =
    useState<boolean>(true);

  const handleClassroomRole = (role: StateContextProps["classroomRole"]) => {
    setClassroomRole((prev) => (prev === role ? prev : role));
  };

  return (
    <StateContext.Provider
      value={{
        classroomRole,
        handleClassroomRole,
        classroomDetailsLoading,
        setClassroomDetailsLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
