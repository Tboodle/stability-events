import BingoBoard from "./[components]/BingoBoard";
import Leaderboard from "./[components]/Leaderboard";

export default function HomePageContent() {
  return (
    <div className="flex w-full h-full flex-col lg:flex-row">
      <BingoBoard />
      <Leaderboard />
    </div>
  );
}
