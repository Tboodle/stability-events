import Image from "next/image";
import useBingoBoard from "../(hooks)/useBingoBoard";
import { Card, CardContent } from "@/components/ui/card";
import useSelectedTeam from "../(hooks)/useSelectedTeam";
import { Team } from "@/types/team";
import { Tile } from "@/types/tile";

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
  const progress = tile.progress.find(
    (progress) => progress.teamId === team.id
  )?.progress;

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
        <div className="grid grid-cols-5 gap-1 p-1 bg-[#5E17EB] rounded-md w-full">
          {tiles.map((tile, index) => {
            const medalSrc = selectedTeam
              ? getMedalSrcForSelectedTeam(selectedTeam, tile)
              : undefined;
            return (
              <Card
                key={index}
                className="aspect-square rounded-md border border-[#5E17EB]"
                // className="w-18 h-18 sm:w-28 sm:h-28 md:h-32 md:w-32 xl:h-36 xl:w-36 2xl:h-48 2xl:w-48 rounded-md border border-black"
              >
                <CardContent className="h-full w-full flex items-center justify-center relative">
                  <Image
                    src={getFileNameForTile(index + 1)}
                    fill
                    objectFit="contain"
                    alt={`Tile ${index + 1} image`}
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
