import { FightStatusPipe } from './fight-status.pipe';
import { FightStatus } from './fight-status';

describe('FightStatusPipe', () => {
  let pipe: FightStatusPipe;
  beforeEach(() => {
    pipe = new FightStatusPipe();
  });

  it('returns correct css class name for each FightStatus', () => {
    expect(pipe.transform(FightStatus.Prepared)).toEqual('prepared');
    expect(pipe.transform(FightStatus.Started)).toEqual('started');
    expect(pipe.transform(FightStatus.Finished)).toEqual('finished');
  });
});
