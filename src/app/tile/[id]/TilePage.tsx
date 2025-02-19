"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TilePage({ id }: { id: string }): React.ReactElement {
  return (
    <div className="p-4 flex flex-col items-center justify-center w-full h-full">
      <Button asChild variant="outline" className="text-foreground mb-2">
        <Link href={"/"}>Go back</Link>
      </Button>
      <div>This is for id: {id}</div>
    </div>
  );
}
