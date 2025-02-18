export type Tile = {
  id: string;
  name: string;
  tasks: Task[];
  progress: { teamId: string; progress: number }[];
  imagePath: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
};
