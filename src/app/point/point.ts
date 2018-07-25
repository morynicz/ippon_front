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
  playerId: number;
  fightId: number;
  type: PointType;
  id: number;
}
