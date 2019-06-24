import { Point } from '../point/point';
import { FightStatus } from '../fight-status';
import { FightWinner } from '../fight-winner';
export class Fight {
  id: number;
  points: Point[];
  aka: number;
  shiro: number;
  team_fight: number;
  orderingNumber: number;
  status: FightStatus;
  winner: FightWinner;
}
