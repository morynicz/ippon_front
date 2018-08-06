import { PointTypePipe } from './point-type.pipe';
import { PointType } from './point';

describe('PointTypePipe', () => {
  let pipe: PointTypePipe;
  beforeEach(() => {
    pipe = new PointTypePipe();
  });

  it('returns a string with readable form of numeric constraint', () => {
    expect(pipe.transform(PointType.Men)).toBe("M");
    expect(pipe.transform(PointType.Kote)).toBe("K");
    expect(pipe.transform(PointType.Do)).toBe("D");
    expect(pipe.transform(PointType.Tsuki)).toBe("T");
    expect(pipe.transform(PointType.Hansoku)).toBe("H");
    expect(pipe.transform(PointType.Foul)).toBe("▲");
    expect(pipe.transform(PointType.Other)).toBe("●");
  });
});
