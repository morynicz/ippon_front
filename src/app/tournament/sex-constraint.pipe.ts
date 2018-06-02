import { Pipe, PipeTransform } from '@angular/core';
import { SexConstraint } from './sex-constraint';

const SEX_CONSTRAINT: string[] = [
  "none",
  "women only",
  "men only"
]

@Pipe({
  name: 'sexConstraint'
})
export class SexConstraintPipe implements PipeTransform {

  transform(constraint: SexConstraint, args?: any): any {
    return SEX_CONSTRAINT[constraint];
  }

}
