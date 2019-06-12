import { Component, OnInit, Input } from '@angular/core';
import { CupFight } from '../../cup-fight/cup-fight';

@Component({
  selector: 'ippon-cup-side',
  templateUrl: './cup-side.component.html',
  styleUrls: ['./cup-side.component.css']
})
export class CupSideComponent implements OnInit {
  @Input() cupFights: CupFight[][];
  @Input() isReverseOrder: boolean;

  constructor() { }

  ngOnInit() { }

  getSeparator(index): number {
    if (index == 0)
      return 0;
    return this.getSeparator(index - 1) * 2 + 1;
  }

  getOrderNo(index: number): number {
    if (this.isReverseOrder) {
      return this.cupFights.length - index - 1;
    }
    return index;
  }
}
