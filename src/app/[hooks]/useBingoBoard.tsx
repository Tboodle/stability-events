import { Tile } from "@/types/tile";

export default function useBingoBoard(): { tiles?: Tile[] } {
  return { tiles: Array.from({ length: 25 }) };
}
