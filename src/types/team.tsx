export type Team = {
  id?: string;
  name: string;
  points: number;
  captain: string;
  event: string;
  members: string[];
  imgSrc: string;
  tileProgress: TileProgress[];
};

type TileProgress = { tile: number; task1?: number; task2?: number; task3?: number };
