import { FightStatus } from "../fight-status";
import { FightWinner } from "../fight-result";

export class TeamFight {
  id: number;
  tournament: number;
  aka_team: number;
  shiro_team: number;
  shiro_score: number;
  aka_score: number;
  status: FightStatus;
  result: FightWinner;
}
