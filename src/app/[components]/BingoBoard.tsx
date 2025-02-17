import Image from "next/image";
import useBingoBoard from "../[hooks]/useBingoBoard";
import { Card, CardContent } from "@/components/ui/card";

export default function BingoBoard() {
  const { tiles } = useBingoBoard();

  return (
    <div className="w-full lg:w-2/3 mr-8 flex justify-center">
      {tiles ? (
        <div className="grid grid-cols-5 gap-1 p-1 bg-black rounded-md w-fit">
          {tiles.map((_, index) => (
            <Card
              key={index}
              className="w-18 h-18 sm:w-28 sm:h-28 md:h-32 md:w-32 rounded-md border border-black"
            >
              <CardContent className="h-full w-full flex items-center justify-center">
                {index + 1}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-1 p-2 bg-black rounded-md">
          {Array.from({ length: 25 }).map((_, index) => (
            <Card key={index} className="rounded-md border border-black"></Card>
          ))}
        </div>
      )}
    </div>
  );
}
