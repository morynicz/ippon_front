import { KendoRankPipe } from './kendo-rank.pipe';
import { Rank, RANK_STRINGS } from './player';

describe('KendoRankPipe', () => {
  let pipe: KendoRankPipe;
  beforeEach(() => {
    pipe = new KendoRankPipe();
  });

  it('returns a string with readable form of rank', () => {
    expect(pipe.transform(Rank.None)).toBe(RANK_STRINGS[Rank.None]);
    expect(pipe.transform(Rank.Kyu_5)).toBe(RANK_STRINGS[Rank.Kyu_5]);
  });
});
