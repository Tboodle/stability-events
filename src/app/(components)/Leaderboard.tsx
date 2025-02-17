import useTeams from "../(hooks)/useTeams";

export default function Leaderboard() {
  const { teams } = useTeams();
  return (
    <div className="flex h-full w-full flex-col max-w-[30rem]">
      <span className="text-4xl text-foreground">Leaderboard</span>
      <div className="flex border p-4 border-foreground w-full h-full flex-col gap-4 rounded">
        {teams ? (
          teams.map((team, index) => (
            <div
              className="flex justify-between text-2xl gap-12 text-left"
              key={team.name}
            >
              <div className="flex gap-4 items-center">
                <div>{index + 1}</div>
                <div>{team.name}</div>
              </div>
              <div>{team.points}</div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
