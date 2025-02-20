import { Card, CardContent } from "@/components/ui/card";
import { useSelectedTeam } from "../_hooks/useSelectedTeam";

export default function TeamMembers(): React.ReactElement {
  const { selectedTeam } = useSelectedTeam();

  return selectedTeam ? (
    <Card>
      <CardContent className="flex flex-col p-8 gap-2">
        {selectedTeam?.members.map((member) => (
          <span key={member}>{member}</span>
        ))}
      </CardContent>
    </Card>
  ) : (
    <></>
  );
}
