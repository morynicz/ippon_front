import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { PlayerListComponent } from './player-list.component';
import { PlayerLineComponent } from '../player-line/player-line.component';
import { Player } from '../player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { PlayerService } from '../player.service';
import { PlayerServiceSpy } from '../player.service.spy';

const dummyPlayers: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 0
},
{
  name: 'P2',
  surname: 'S2',
  id: 1
}];

describe('PlayersListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let playerService: PlayerServiceSpy;

  beforeEach(waitForAsync(() => {
    playerService = new PlayerServiceSpy();
    playerService.getListReturnValues.push(dummyPlayers);
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

  it('should load players using player.service.getPlayers() on init', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(playerService.getListValue).toBeTruthy();
    });
  }));

  it('should display loaded players', waitForAsync(() => {
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
