"use client";

import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import React, { useEffect } from "react";
import { useNewDrop } from "../_hooks/useNewDrop";
import { toast } from "sonner";
import { useTeams } from "../_hooks/useTeams";

export default function DropToaster(): React.ReactElement {
  const { newDrop } = useNewDrop();
  const { teams } = useTeams();

  useEffect(() => {
    if (newDrop) {
      const team = teams.find((team) =>
        team.members
          .map((member) => member.toLowerCase())
          .includes(newDrop?.player.toLowerCase() || "")
      );

      toast.custom(
        (id) => (
          <div className="relative flex w-full max-w-sm items-center gap-4 rounded-md border bg-background p-4 shadow-lg mr-8">
            {/* Close button in top-right corner */}
            <button
              onClick={() => toast.dismiss(id)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              ✖
            </button>

            {/* Toast Content */}
            <div className="flex flex-col w-full gap-6">
              <div className="flex gap-4">
                {/* Team Captain Image */}
                <div className="relative h-16 w-16">
                  <Image
                    src={`/${team?.captain.toLowerCase()}.png`}
                    alt={team?.name + " team image"}
                    fill
                    sizes="100%"
                    unoptimized
                    className="rounded-sm object-cover"
                  />
                </div>

                {/* Player & Team Info */}
                <div className="flex flex-col">
                  <span className="text-xl text-foreground capitalize">
                    {newDrop?.player}
                  </span>
                  <span className="text-lg text-muted-foreground capitalize">
                    {team?.name}
                  </span>
                </div>
              </div>

              {/* Item Name */}
              <div className="flex text-2xl text-foreground">
                {newDrop.itemName
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
            </div>
          </div>
        ),
        {
          duration: Infinity, // Persistent toast
        }
      );

      toast.custom(
        (id) => (
          <div className="relative flex w-full max-w-sm items-center gap-4 rounded-md border bg-background p-4 shadow-lg mr-8">
            {/* Close button in top-right corner */}
            <button
              onClick={() => toast.dismiss(id)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              ✖
            </button>

            {/* Toast Content */}
            <div className="flex flex-col w-full gap-6">
              <div className="flex gap-4">
                {/* Team Captain Image */}
                <div className="relative h-16 w-16">
                  <Image
                    src={`/${team?.captain.toLowerCase()}.png`}
                    alt={team?.name + " team image"}
                    fill
                    sizes="100%"
                    unoptimized
                    className="rounded-sm object-cover"
                  />
                </div>

                {/* Player & Team Info */}
                <div className="flex flex-col">
                  <span className="text-xl text-foreground capitalize">
                    {newDrop?.player}
                  </span>
                  <span className="text-lg text-muted-foreground capitalize">
                    {team?.name}
                  </span>
                </div>
              </div>

              {/* Item Name */}
              <div className="flex flex-col text-2xl text-foreground gap-2">
                <div>
                  {newDrop.itemName
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <div className="text-muted-foreground text">
                  ({newDrop.date.toISOString()})
                </div>
              </div>
            </div>
          </div>
        ),
        {
          duration: Infinity, // Persistent toast
        }
      );
    }
  }, [newDrop, teams]);
  return <Toaster />;
}
