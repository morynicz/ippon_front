import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerService } from './player.service';
import { Player, Sex, Rank } from './player'

const playersUrl = "api/players";

describe('PlayerService', () => {
  let injector: TestBed;
  let service: PlayerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService]
    });
    // injector = getTestBed();
    // service = injector.get(PlayerService);
    // httpMock = injector.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('calls upon proper url and returns result when getPlayersCalled', async(inject([PlayerService, HttpTestingController], (service: PlayerService, backend: HttpTestingController) => {
    let receivedPlayers: Player[];
    let dummyPlayers = [
      {
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
      }
    ];
    service.getPlayers().subscribe(players => {
      expect(players).toEqual(dummyPlayers);
    });
    const req = backend.expectOne(`${playersUrl}`);
    expect(req.request.method).toBe("GET");
  })));
});
