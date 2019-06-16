import { FightStatus } from "../fight-status";
import { FightWinner } from "../fight-winner";

export class TeamFight {
  id: number;
  tournament: number;
  aka_team: number;
  shiro_team: number;
  shiro_score: number;
  aka_score: number;
  status: FightStatus;
  winner: FightWinner;
}
