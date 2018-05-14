import { Rank } from '../rank';
import { Sex } from '../sex';

export class Player {
  name: string;
  surname: string;
  sex: Sex;
  birthday: Date;
  rank: Rank;
  club_id: number;
  id: number;
}
