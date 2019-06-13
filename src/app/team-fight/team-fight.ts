import { FightStatus } from "../fight-status";

export class TeamFight {
  id: number;
  tournament: number;
  aka_team: number;
  shiro_team: number;
  shiro_score: number;
  aka_score: number;
  status: FightStatus;
}
