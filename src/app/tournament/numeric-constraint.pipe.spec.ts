import { NumericConstraintPipe } from './numeric-constraint.pipe';
import { NumericConstraint } from './numeric-constraint';

describe('NumericConstraintPipe', () => {
  let pipe: NumericConstraintPipe;
  beforeEach(() => {
    pipe = new NumericConstraintPipe();
  });

  it('returns a string with readable form of numeric constraint', () => {
    expect(pipe.transform(NumericConstraint.None)).toBe("None");
    expect(pipe.transform(NumericConstraint.Less)).toBe("<");
    expect(pipe.transform(NumericConstraint.LessOrEqual)).toBe("<=");
    expect(pipe.transform(NumericConstraint.Greater)).toBe(">");
    expect(pipe.transform(NumericConstraint.GreaterOrEqual)).toBe(">=");
    expect(pipe.transform(NumericConstraint.Equal)).toBe("=");
    expect(pipe.transform(NumericConstraint.NotEqual)).toBe("!=");
  });
});
