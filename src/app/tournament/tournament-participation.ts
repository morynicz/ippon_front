import { Player } from '../player/player';

export class TournamentParticipation {
  id: number;
  tournament_id: number;
  player: Player;
  is_registered: boolean;
  is_paid: boolean;
  is_sex_ok: boolean;
  is_age_ok: boolean;
  is_rank_ok: boolean;
  notes: string;
}
