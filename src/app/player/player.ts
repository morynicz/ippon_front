export enum Sex {
  Male = 0,
  Female
}

export enum Rank {
  None = 0,
  Kyu_6,
  Kyu_5,
  Kyu_4,
  Kyu_3,
  Kyu_2,
  Kyu_1,
  Dan_1,
  Dan_2,
  Dan_3,
  Dan_4,
  Dan_5,
  Dan_6,
  Dan_7,
  Dan_8
}

export const RANK_STRINGS = [
  "None",
  "6 Kyu",
  "5 Kyu",
  "4 Kyu",
  "3 Kyu",
  "2 Kyu",
  "1 Kyu",
  "1 Dan",
  "2 Dan",
  "3 Dan",
  "4 Dan",
  "5 Dan",
  "6 Dan",
  "7 Dan",
  "8 Dan"
]

export class Player {
  name: string;
  surname: string;
  sex: Sex;
  birthday: Date;
  rank: Rank;
  club_id: number;
  id: number;
}
