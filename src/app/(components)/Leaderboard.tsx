"use client";

import Image from "next/image";
import { useTeams } from "../(hooks)/useTeams";
import { Card, CardContent } from "@/components/ui/card";
import useSelectedTeam from "../(hooks)/useSelectedTeam";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Leaderboard() {
  const { teams } = useTeams();
  const { selectedTeam, setSelectedTeam } = useSelectedTeam();
  return (
    <div className="flex h-full w-full flex-col max-w-[30rem]">
      <span className="text-4xl text-foreground mb-2">Leaderboard</span>
      <Card className="flex w-full h-full flex-col gap-4 rounded">
        <CardContent className="py-4 [&>*:not(:last-child)]:mb-4">
          {teams ? (
            teams.map((team, index) => (
              <Button
                variant="ghost"
                className={cn(
                  "flex justify-between text-3xl gap-12 text-left items-center w-full h-fit",
                  selectedTeam?.id === team.id && "bg-accent"
                )}
                key={team.name}
                onClick={() => setSelectedTeam(team)}
              >
                <div className="flex gap-4 items-center">
                  <div>{index + 1}</div>
                  <div className="flex gap-4 items-center">
                    {true && (
                      <div className="relative h-20 w-20">
                        <Image
                          src={"ledzeps.png"}
                          alt={team.name + " team image"}
                          fill
                          unoptimized
                          objectFit="contain"
                          className="rounded-sm"
                        />
                      </div>
                    )}
                    <div className="flex items-center">{team.name}</div>
                  </div>
                </div>
                <div>{team.points}</div>
              </Button>
            ))
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
