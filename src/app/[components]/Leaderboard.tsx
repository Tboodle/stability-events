import Image from "next/image";
import useTeams from "../[hooks]/useTeams";

export default function Leaderboard() {
  const { teams } = useTeams();
  return (
    <div className="flex h-full w-full flex-col max-w-[30rem]">
      <span className="text-3xl">Leaderboard</span>
      <div className="flex border p-4 border-black w-full h-full flex-col">
        {teams ? (
          teams.map((team, index) => (
            <div className="flex justify-between text-xl gap-12 text-left">
              <div className="flex gap-4">
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
