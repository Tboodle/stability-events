"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTile } from "@/app/(hooks)/useTile";
import { getFileNameForTile } from "@/utils/tileUtils";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TilePage({ id }: { id: string }): React.ReactElement {
  const { tile } = useTile(id);

  return (
    <div className="flex flex-col h-full w-full">
      <Button asChild variant="outline" className="text-foreground mb-2 w-fit">
        <Link href={"/"}>
          <ArrowLeft /> Back
        </Link>
      </Button>
      {tile ? (
        <div className="flex justify-between gap-8">
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
          <div className="flex flex-col items-start">
            <h1 className="text-3xl mb-4">{tile.name}</h1>
            <Card>
              <CardContent className="flex flex-col p-8 text-foreground">
                <div className="text-xl mb-4 flex gap-4">
                  <div className="text-foreground/60">Task 1:</div>{" "}
                  <div>{tile.task1}</div>
                </div>
                <div className="text-xl mb-4 flex gap-4">
                  <div className="text-foreground/60">Task 2:</div>{" "}
                  <div>{tile.task2}</div>
                </div>
                <div className="text-xl flex gap-4">
                  <div className="text-foreground/60">Task 3:</div>{" "}
                  <div>{tile.task3}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
