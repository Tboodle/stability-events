export type Tile = {
  id: string;
  name: string;
  task1: string;
  task2: string;
  task3: string;
  tile: number;
  doubleRow?: boolean;
  doubleCol?: boolean;
};

export type Task = {
  id: string;
  name: string;
  description: string;
};
