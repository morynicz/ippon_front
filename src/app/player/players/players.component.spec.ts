import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { PlayersComponent } from './players.component';
import { PlayerLineComponent } from '../player-line/player-line.component';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { PLAYERS } from '../mock-players'

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let playerServiceStub;

  beforeEach(async(() => {
    playerServiceStub = {
      getPlayers(): Observable<Player[]> {
        return of(PLAYERS);
      }
    }

    TestBed.configureTestingModule({
      declarations: [PlayersComponent, PlayerLineComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: PlayerService, useValue: playerServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
