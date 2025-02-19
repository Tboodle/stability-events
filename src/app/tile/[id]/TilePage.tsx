"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTile } from "@/app/(hooks)/useTile";
import { getFileNameForTile } from "@/utils/tileUtils";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tile } from "@/types/tile";
import { useTeams } from "@/app/(hooks)/useTeams";
import { Team } from "@/types/team";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function getTaskTabContent(
  task: "task1" | "task2" | "task3",
  tile: Tile,
  teams: Team[]
): React.ReactElement {
  const teamsWithProgress = teams
    .map((team) => {
      const progress =
        team.tileProgress.find((teamTile) => teamTile.tile === tile.tile)?.[
          task
        ] || 0;

      return { team: team, progress };
    })
    .sort((teamA, teamB) => teamA.team.name.localeCompare(teamB.team.name));
  console.log(teamsWithProgress);
  return (
    <Card>
      <CardTitle className="text-3xl p-8 font-normal">
        {tile[task].description}
      </CardTitle>
      <CardContent className="flex flex-col">
        {teamsWithProgress.map((team) => {
          console.log(team.progress);
          return (
            <div key={team.team.id} className="mb-8 flex items-center">
              <div className="flex gap-4 w-[30rem]">
                {true && (
                  <div className="relative h-20 w-20">
                    <Image
                      src={"/ledzeps.png"}
                      alt={team.team.name + " team image"}
                      fill
                      sizes="100%"
                      unoptimized
                      className="rounded-sm object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center text-2xl">
                  {team.team.name}
                </div>
              </div>
              <Progress
                value={(team.progress / tile[task].target) * 100}
                className={cn(
                  "w-full mr-8",
                  team.progress >= tile[task].target && "[&>div]:bg-blue-500"
                )}
              />
              <div className="text-foreground/40 text-2xl text-nowrap w-[10rem] text-end">
                {team.progress >= tile[task].target ? (
                  <CheckCircle className="w-16 h-16 text-blue-800 ml-auto" />
                ) : (
                  <div>
                    {team.progress} / {tile[task].target || 1}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function TilePage({ id }: { id: string }): React.ReactElement {
  const { tile } = useTile(id);
  const { teams } = useTeams();

  return (
    <div className="flex flex-col h-full w-full">
      <Button asChild variant="outline" className="text-foreground mb-2 w-fit">
        <Link href={"/"}>
          <ArrowLeft /> Back
        </Link>
      </Button>
      {tile ? (
        <div className="flex flex-col h-full w-full">
          <div className="flex gap-8 mb-24">
            <div className="relative w-72 h-72 border-[6px] border-purple-800 rounded-md">
              <Image
                src={getFileNameForTile(tile.tile)}
                fill
                priority
                sizes="100%"
                className="object-cover"
                alt={`Tile ${tile.tile} image`}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-4xl font-bold mb-4">{tile.name}</h1>
              <Card className="w-full h-full">
                <CardContent className="flex flex-col p-8 text-foreground">
                  <div className="text-xl mb-8 flex gap-4">
                    <div className="text-foreground/60 min-w-fit">Task 1:</div>{" "}
                    <div>{tile.task1.description}</div>
                  </div>
                  <div className="text-xl mb-8 flex gap-4">
                    <div className="text-foreground/60 min-w-fit">Task 2:</div>{" "}
                    <div>{tile.task2.description}</div>
                  </div>
                  <div className="text-xl flex gap-4">
                    <div className="text-foreground/60 min-w-fit">Task 3:</div>{" "}
                    <div>{tile.task3.description}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Tabs defaultValue="task1" className="w-full">
              <TabsList className="mb-4 py-6">
                <TabsTrigger value="task1" className="px-8 h-10 text-md">
                  Task 1
                </TabsTrigger>
                <TabsTrigger value="task2" className="px-8 h-10 text-md">
                  Task 2
                </TabsTrigger>
                <TabsTrigger value="task3" className="px-8 h-10 text-md">
                  Task 3
                </TabsTrigger>
              </TabsList>
              <TabsContent value="task1" className="w-full">
                {getTaskTabContent("task1", tile, teams)}
              </TabsContent>
              <TabsContent value="task2" className="w-full">
                {getTaskTabContent("task2", tile, teams)}
              </TabsContent>
              <TabsContent value="task3" className="w-full">
                {getTaskTabContent("task3", tile, teams)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
