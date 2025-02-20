"use client";

import BingoBoard from "./_components/BingoBoard";
import Leaderboard from "./_components/Leaderboard";

export default function HomePageContent() {
  return (
    <>
      <div className="hidden lg:flex w-full h-full flex-row items-start justify-center gap-8 z-10">
        <BingoBoard />
        <Leaderboard />
      </div>
      <div className="flex lg:hidden w-full h-full flex-col justify-center items-center gap-8 pb-12 px-2">
        <Leaderboard />
        <BingoBoard />
      </div>
    </>
  );
}
