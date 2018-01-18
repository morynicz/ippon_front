import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerFullComponent } from './player-full.component';
import { Player, Rank, Sex } from '../player';
import { PlayerService } from '../player.service';
import { PLAYERS } from '../mock-players'

import { Club } from '../../club/club'
import { ClubService } from '../../club/club.service';

class PlayerServiceSpy {
  id: number;
  player: Player = {
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 0,
    id: 0
  }
  getPlayer(id: number) {
    this.id = id;
    return of(this.player);
  }
}

class ClubServiceSpy {
  id: number;
  club: Club = {
    id: 1,
    name: 'C4',
    description: 'D',
    city: 'Ci',
    webpage: 'W'
  }
}

describe('PlayerFullComponent', () => {
  let component: PlayerFullComponent;
  let fixture: ComponentFixture<PlayerFullComponent>;
  let playerServiceSpy: PlayerServiceSpy;
  let clubServiceSpy: ClubServiceSpy;

  beforeEach(async(() => {
    playerServiceSpy = new PlayerServiceSpy();
    clubServiceSpy = new ClubServiceSpy();

    TestBed.configureTestingModule({
      declarations: [PlayerFullComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PlayerService, useValue: playerServiceSpy },
        { provide: ClubService, useValue: clubServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
