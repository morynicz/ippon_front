import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerFormComponent } from './player-form.component';
import { Player, Rank, Sex } from './../player';
import { PlayerService } from '../player.service';

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
  getPlayer(id: number): Observable<Player> {
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
  getClubs(): Observable<Club[]> {
    return of([this.club]);
  }
}

describe('PlayerFormComponent', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;
  let playerServiceSpy: PlayerServiceSpy;
  let clubServiceSpy: ClubServiceSpy;

  beforeEach(async(() => {
    playerServiceSpy = new PlayerServiceSpy();
    clubServiceSpy = new ClubServiceSpy();

    TestBed.configureTestingModule({
      declarations: [PlayerFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: PlayerService, useValue: playerServiceSpy },
        { provide: ClubService, useValue: clubServiceSpy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
