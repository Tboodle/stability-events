"use client";

import BingoBoard from "./(components)/BingoBoard";
import Leaderboard from "./(components)/Leaderboard";

export default function HomePageContent() {
  return (
    <>
      <div className="hidden lg:flex w-full h-full flex-row items-start justify-start gap-8">
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
