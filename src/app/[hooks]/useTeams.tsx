import { Team } from "@/types/team";
import { Tile } from "@/types/tile";

export default function useTeams(): { teams?: Team[] } {
  return {
    teams: [
      { name: "Ledzeps", points: 999 },
      { name: "Barsk", points: 690 },
      { name: "Silent", points: 500 },
      { name: "Spoons", points: 400 },
    ],
  };
}
