import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import useSelectedTeam from "../(hooks)/useSelectedTeam";
import { Team } from "@/types/team";
import { Tile } from "@/types/tile";
import { useBingoBoard } from "../(hooks)/useBingoBoard";
import { cn } from "@/lib/utils";

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
  // const progress = tile.progress.find(
  //   (progress) => progress.teamId === team.id
  // )?.progress;
  const progress = 0;

  if (!progress) return undefined;

  if (progress === 1 || progress === 2 || progress == 4) {
    return "bronze_medal.png";
  }

  if (progress === 3 || progress === 5 || progress === 6) {
    return "silver_medal.png";
  }

  return "gold_medal.png";
}

export default function BingoBoard() {
  const { tiles } = useBingoBoard();
  const { selectedTeam } = useSelectedTeam();

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
                    objectFit="cover"
                    alt={`Tile ${tile.tile} image`}
                  />
                  {medalSrc && (
                    <div className="absolute bottom-0 left-0 h-1/2 w-1/2">
                      <Image
                        src={medalSrc}
                        fill
                        objectFit="contain"
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
