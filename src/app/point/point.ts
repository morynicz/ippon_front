export enum PointType {
  Men = 0,
  Kote,
  Do,
  Tsuki,
  Foul,
  Hansoku,
  Other
}

export class Point {
  player: number;
  fight: number;
  type: PointType;
  id: number;
}
