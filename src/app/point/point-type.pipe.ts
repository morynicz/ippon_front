import { Pipe, PipeTransform } from '@angular/core';
import { PointType } from './point';

const POINT_TYPE_STRINGS: string[] = [
  "M",
  "K",
  "D",
  "T",
  "▲",
  "H",
  "●"
];

@Pipe({
  name: 'pointType'
})
export class PointTypePipe implements PipeTransform {
  transform(pointType: PointType, args?: any): any {
    return POINT_TYPE_STRINGS[pointType];
  }
}
