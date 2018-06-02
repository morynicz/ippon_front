import { SexConstraintPipe } from './sex-constraint.pipe';
import { SexConstraint } from './sex-constraint';

describe('SexConstraintPipe', () => {
  let pipe: SexConstraintPipe;
  beforeEach(() => {
    pipe = new SexConstraintPipe();
  });

  it('returns a string with readable form of numeric constraint', () => {
    expect(pipe.transform(SexConstraint.None)).toBe("none");
    expect(pipe.transform(SexConstraint.MenOnly)).toBe("men only");
    expect(pipe.transform(SexConstraint.WomenOnly)).toBe("women only");
  });
});
