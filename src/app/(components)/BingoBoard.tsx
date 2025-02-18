import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Team } from "@/types/team";
import { Tile } from "@/types/tile";
import { useBingoBoard } from "../(hooks)/useBingoBoard";
import { cn } from "@/lib/utils";
import { useSelectedTeam } from "../(hooks)/useSelectedTeam";

function getFileNameForTile(tile: number): string {
  if (tile === 1 || tile === 6) {
    return "/1.png";
  }

  if (tile === 12 || tile === 17) {
    return "/12.png";
  }

  if (tile === 23 || tile === 24) {
    return "/23.png";
  }

  return `/${tile}.png`;
}

function getMedalSrcForSelectedTeam(
  team: Team,
  tile: Tile
): string | undefined {
  const progress = team.tileProgress.find(
    (progress) => progress.tile === tile.tile
  )?.progress;

  console.log(team.name, progress, tile.name);

  if (!progress) return undefined;

  if (progress === 1 || progress === 2 || progress == 4) {
    return "/bronze_medal.png";
  }

  if (progress === 3 || progress === 5 || progress === 6) {
    return "/silver_medal.png";
  }

  return "/gold_medal.png";
}

export default function BingoBoard() {
  const { tiles } = useBingoBoard();
  const { selectedTeam } = useSelectedTeam();
  console.log(selectedTeam);

  return (
    <div className="w-full md:w-[90%] lg:w-3/4 flex justify-center max-w-[900px]">
      {tiles ? (
        <div className="grid grid-cols-5 grid-auto-rows-[1fr] gap-1 p-1 bg-[#5E17EB] rounded-md w-full">
          {tiles.map((tile) => {
            const medalSrc = selectedTeam
              ? getMedalSrcForSelectedTeam(selectedTeam, tile)
              : undefined;
            return (
              <Card
                key={tile.id}
                className={cn(
                  "rounded-md border border-[#5E17EB] relative w-full h-full",
                  tile.doubleCol && "col-span-2",
                  tile.doubleRow && "row-span-2",
                  !tile.doubleCol && !tile.doubleRow && "aspect-square"
                )}
              >
                <CardContent className={cn("relative w-full h-full")}>
                  <Image
                    src={getFileNameForTile(tile.tile)}
                    fill
                    priority
                    sizes="100%"
                    className="object-cover"
                    alt={`Tile ${tile.tile} image`}
                  />
                  {medalSrc && (
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 aspect-square",
                        tile.doubleRow && "h-1/4",
                        tile.doubleCol && "w-1/4",
                        !tile.doubleCol && !tile.doubleRow && "h-1/2"
                      )}
                    >
                      <Image
                        src={medalSrc}
                        fill
                        sizes="100%"
                        className="object-contain"
                        alt="Bronze Medal"
                      />
                    </div>
                  )}
                  {medalSrc && (tile.doubleCol || tile.doubleRow) && (
                    <div
                      className={cn(
                        "absolute aspect-square",
                        tile.doubleRow && "h-1/4 bottom-[50%] left-0",
                        tile.doubleCol && "w-1/4 bottom-0 left-[50%]"
                      )}
                    >
                      <Image
                        src={medalSrc}
                        fill
                        sizes="100%"
                        className="object-contain"
                        alt="Bronze Medal"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-1 p-2 bg-[#5E17EB] rounded-md">
          {Array.from({ length: 25 }).map((_, index) => (
            <Card
              key={index}
              className="rounded-md border border-[#5E17EB]"
            ></Card>
          ))}
        </div>
      )}
    </div>
  );
}
