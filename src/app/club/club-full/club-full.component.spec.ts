import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubFullComponent } from './club-full.component';
import { Club } from '../club';
import { ClubService } from '../club.service';

import { Player, Sex, Rank } from '../../player/player';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { PlayerService } from '../../player/player.service';

class ClubServiceSpy {
  id: number;
  club: Club = {
    id: 1,
    name: 'C1',
    description: 'D1',
    city: 'Ci1',
    webpage: 'W1'
  };
  getClub(id: number): Observable<Club> {
    this.id = id;
    return of(this.club);
  }
}

class PlayerServiceSpy {
  players: Player[] = [{
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 0,
    id: 0
  },
  {
    name: 'P2',
    surname: 'S2',
    sex: Sex.Male,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_4,
    club_id: 1,
    id: 1
  }];
  getPlayers(): Observable<Player[]> {
    return of(this.players);
  }
}

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ClubService, useClass: ClubServiceSpy },
        { provide: PlayerService, useClass: PlayerServiceSpy }
      ],
      imports: [RouterTestingModule],
      declarations: [ClubFullComponent, PlayerLineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
