import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Team } from "@/types/team";
import { Tile } from "@/types/tile";
import { useBingoBoard } from "../_hooks/useBingoBoard";
import { cn } from "@/lib/utils";
import { useSelectedTeam } from "../_hooks/useSelectedTeam";
import Link from "next/link";
import { getFileNameForTile } from "@/utils/tileUtils";

function getMedalSrcForSelectedTeam(
  team: Team,
  tile: Tile
): string | undefined {
  const tileProgress = team.tileProgress.find(
    (progress) => progress.tile === tile.tile
  );

  const medalScore =
    (tileProgress?.task1.progress === tileProgress?.task1.target ? 1 : 0) +
    (tileProgress?.task2.progress === tileProgress?.task2.target ? 1 : 0) +
    (tileProgress?.task3.progress === tileProgress?.task3.target ? 1 : 0);

  if (!medalScore) return undefined;

  if (medalScore === 1) {
    return "/bronze_medal.png";
  }

  if (medalScore === 2) {
    return "/silver_medal.png";
  }

  return "/gold_medal.png";
}

export default function BingoBoard() {
  const { tiles } = useBingoBoard();

  return (
    <div className="w-full md:w-[90%] lg:w-3/4 flex justify-center max-w-[900px]">
      {tiles ? (
        <div className="grid grid-cols-5 grid-auto-rows-[1fr] gap-1 p-1 bg-purple-800 rounded-md w-full">
          {tiles.map((tile) => {
            return <BingoCard key={tile.id} tile={tile} />;
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

function BingoCard({ tile }: { tile: Tile }): React.ReactElement {
  const { selectedTeam } = useSelectedTeam();
  const medalSrc = selectedTeam
    ? getMedalSrcForSelectedTeam(selectedTeam, tile)
    : undefined;
  return (
    <Card
      key={tile.id}
      className={cn(
        "rounded-md border border-purple-800 relative w-full h-full",
        tile.doubleCol && "col-span-2",
        tile.doubleRow && "row-span-2",
        !tile.doubleCol && !tile.doubleRow && "aspect-square"
      )}
    >
      <CardContent
        className={cn(
          "relative w-full h-full",
          "transition-transform duration-300 ease-in-out cursor-pointer transform hover:z-50 shadow-none hover:shadow-[0_0_20px_rgba(255,255,255,0.75)] hover:rounded-sm"
        )}
      >
        <Link href={`/tile/${tile.id}`}>
          <Image
            src={getFileNameForTile(tile.tile)}
            fill
            priority
            sizes="100%"
            className="object-cover"
            alt={`Tile ${tile.tile} image`}
          />
        </Link>
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
              className="object-contain drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              alt="Bronze Medal"
            />
          </div>
        )}
        {medalSrc && (tile.doubleCol || tile.doubleRow) && (
          <div
            className={cn(
              "absolute aspect-square",
              tile.doubleRow && "h-1/4 bottom-[50%] -translate-y-1 left-0",
              tile.doubleCol && "w-1/4 bottom-0 left-[50%] translate-x-1"
            )}
          >
            <Image
              src={medalSrc}
              fill
              sizes="100%"
              className="object-contain drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              alt="Bronze Medal"
            />
          </div>
        )}
        {/* {tile.doubleRow && (
          <div
            className="absolute top-1/2 left-0 w-full h-[6px] border-0 bg-transparent -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #6b21a8 0px, #6b21a8 6px, transparent 6px, transparent 12px)",
            }}
          />
        )}
        {tile.doubleCol && (
          <div
            className="absolute top-0 left-1/2 h-full w-[6px] border-0 bg-transparent -translate-x-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #6b21a8 0px, #6b21a8 6px, transparent 6px, transparent 12px)",
            }}
          />
        )} */}
      </CardContent>
    </Card>
  );
}
