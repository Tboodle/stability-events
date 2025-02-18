import { Team } from "@/types/team";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface SelectedTeamContext {
  selectedTeam: Team | undefined;
  setSelectedTeam: React.Dispatch<React.SetStateAction<Team | undefined>>;
}

// Create the context with a default value
const MyContext = createContext<SelectedTeamContext | undefined>(undefined);

export function SelectedTeamProvider({ children }: { children: ReactNode }) {
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);

  return (
    <MyContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook to use the context
export const useSelectedTeam = (): SelectedTeamContext => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
