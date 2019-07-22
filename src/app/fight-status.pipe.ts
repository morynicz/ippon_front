import { Pipe, PipeTransform } from '@angular/core';
import { FightStatus } from './fight-status';

const FIGHT_STATUS_STRINGS: string[] = [
  "prepared",
  "started",
  "finished"
];

@Pipe({
  name: 'fightStatus'
})
export class FightStatusPipe implements PipeTransform {

  transform(status: FightStatus): string {
    return FIGHT_STATUS_STRINGS[status];
  }

}
