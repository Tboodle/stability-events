export type Tile = {
  id: string;
  name: string;
  tasks: Task[];
  progress: { teamId: string; progress: TileProgress }[];
  imagePath: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
};

export type TileProgress = "empty" | "bronze" | "silver" | "gold";
