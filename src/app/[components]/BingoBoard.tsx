import Image from "next/image";
import useBingoBoard from "../[hooks]/useBingoBoard";
import { Card, CardContent } from "@/components/ui/card";

export default function BingoBoard() {
  const { tiles } = useBingoBoard();

  return (
    <div className="w-full md:w-[90%] lg:w-3/4 flex justify-center max-w-[1000px]">
      {tiles ? (
        <div className="grid grid-cols-5 gap-1 p-1 bg-[#5E17EB] rounded-md w-full">
          {tiles.map((_, index) => (
            <Card
              key={index}
              className="aspect-square rounded-md border border-[#5E17EB]"
              // className="w-18 h-18 sm:w-28 sm:h-28 md:h-32 md:w-32 xl:h-36 xl:w-36 2xl:h-48 2xl:w-48 rounded-md border border-black"
            >
              <CardContent className="h-full w-full flex items-center justify-center">
                {index + 1}
              </CardContent>
            </Card>
          ))}
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
