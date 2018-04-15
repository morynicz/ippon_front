import { Pipe, PipeTransform } from '@angular/core';
import { Rank, RANK_STRINGS } from './player';

@Pipe({ name: 'kendoRank' })
export class KendoRankPipe implements PipeTransform {
  transform(rank: Rank, args?: any): string {
    return RANK_STRINGS[rank];
  }
}
