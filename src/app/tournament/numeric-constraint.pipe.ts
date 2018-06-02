import { Pipe, PipeTransform } from '@angular/core';
import { NumericConstraint } from './numeric-constraint';

const CONSTRAINT_STRINGS: string[] = [
  "None",
  "<",
  "<=",
  ">",
  ">=",
  "=",
  "!="
];

@Pipe({
  name: 'numericConstraint'
})
export class NumericConstraintPipe implements PipeTransform {
  transform(constraint: NumericConstraint, args?: any): any {
    return CONSTRAINT_STRINGS[constraint];
  }
}
