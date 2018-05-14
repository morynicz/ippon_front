import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { PlayerListComponent } from './player-list.component';
import { PlayerLineComponent } from '../player-line/player-line.component';
import { Player } from '../player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { PlayerService } from '../player.service';

const dummyPlayers: Player[] = [{
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


class PlayerServiceSpy {
  getPlayersCalled: boolean = false;
  getPlayers(): Observable<Player[]> {
    this.getPlayersCalled = true;
    return of(dummyPlayers);
  }
}

describe('PlayersListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let playerService;

  beforeEach(async(() => {
    playerService = new PlayerServiceSpy();
    TestBed.configureTestingModule({
      declarations: [PlayerListComponent, PlayerLineComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: PlayerService, useValue: playerService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load players using player.service.getPlayers() on init', async(() => {
    fixture.whenStable().then(() => {
      expect(playerService.getPlayersCalled).toBeTruthy();
    });
  }));

  it('should display loaded players', async(() => {
    fixture.whenStable().then(() => {
      const de = fixture.debugElement;
      const html = de.nativeElement;
      const playerLines = html.querySelectorAll('ippon-player-line');

      expect(playerLines[0].textContent).toContain('P1');
      expect(playerLines[0].textContent).toContain('S1');
      expect(playerLines[1].textContent).toContain('P2');
      expect(playerLines[1].textContent).toContain('S2');
    });
  }));
});
