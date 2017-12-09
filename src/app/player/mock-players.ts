import { Player, Sex, Rank } from "./player";

export const PLAYERS: Player[] = [
  {
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 0,
    id: 0
  },
  {
    name: 'P2',
    surname: 'S2',
    sex: Sex.Male,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_4,
    club_id: 1,
    id: 1
  },
  {
    name: 'P3',
    surname: 'S3',
    sex: Sex.Male,
    birthday: new Date("2003-03-03"),
    rank: Rank.Kyu_3,
    club_id: 3,
    id: 3
  },
  {
    name: 'P4',
    surname: 'S4',
    sex: Sex.Female,
    birthday: new Date("2004-04-04"),
    rank: Rank.Kyu_2,
    club_id: 4,
    id: 4
  },
  {
    name: 'P5',
    surname: 'S5',
    sex: Sex.Female,
    birthday: new Date("2005-05-05"),
    rank: Rank.Kyu_1,
    club_id: 5,
    id: 5
  }
];
