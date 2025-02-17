import Image from "next/image";
import BingoBoard from "./[components]/BingoBoard";
import Leaderboard from "./[components]/Leaderboard";
import NavBar from "./[components]/NavBar";

export default function HomePageContent() {
  return (
    <div className="flex w-full h-full">
      <NavBar />
      <div className="flex justify-between mt-8">
        <BingoBoard />
        <Leaderboard />
      </div>
    </div>
  );
}
