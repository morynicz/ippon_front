import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayerLineComponent } from './player-line.component';
import { Player, Sex, Rank } from '../player';

describe('PlayerLineComponent', () => {
  let component: PlayerLineComponent;
  let fixture: ComponentFixture<PlayerLineComponent>;
  let expectedPlayer: Player;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerLineComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLineComponent);
    component = fixture.componentInstance;
    expectedPlayer = {
      name: 'P1',
      surname: 'S1',
      sex: Sex.Male,
      birthday: new Date("2001-01-01"),
      rank: Rank.Kyu_5,
      club_id: 0,
      id: 0
    };
    component.player = expectedPlayer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
