import { NumericConstraint } from './numeric-constraint';
import { Rank } from '../rank';
import { SexConstraint } from './sex-constraint';

export class Tournament {
  id: number;
  name: string;
  date: Date;
  city: string;
  address: string;
  team_size: number;
  group_match_length: number;
  ko_match_length: number;
  final_match_length: number;
  finals_depth: number;
  age_constraint: NumericConstraint;
  rank_constraint: NumericConstraint;
  sex_constraint: SexConstraint;
  rank_constraint_value: Rank;
  age_constraint_value: number;
  description: string;
  webpage: string;
}
