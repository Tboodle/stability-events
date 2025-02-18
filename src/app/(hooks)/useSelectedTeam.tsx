import { Team } from "@/types/team";
import { Dispatch, SetStateAction, useState } from "react";

export default function useSelectedTeam(): {
  selectedTeam?: Team;
  setSelectedTeam: Dispatch<SetStateAction<Team | undefined>>;
} {
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);
  return { selectedTeam, setSelectedTeam };
}
