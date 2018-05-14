import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerService } from './player.service';
import { Player } from './player'
import { Rank } from '../rank';
import { Sex } from '../sex';

import {
  IPPON_HOST,
  PLAYERS_ENDPOINT
} from '../rest-api';

const playersUrl = IPPON_HOST + PLAYERS_ENDPOINT;

describe('PlayerService', () => {
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('calls upon proper url and returns result when getPlayersCalled', async(inject([PlayerService, HttpTestingController], (service: PlayerService, backend: HttpTestingController) => {
    let dummyPlayers: Player[] = [
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
      expect(players).toBe(dummyPlayers);
    });
    const req = backend.expectOne(`${playersUrl}`);
    expect(req.request.method).toBe("GET");
    expect(req.request.headers.has('Content-Type')).toBe(true);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(dummyPlayers);
  })));

  it('calls the api url with application/json content type and POST method when addPlayer called',
    inject([PlayerService, HttpTestingController],
      (service: PlayerService, backend: HttpTestingController) => {
        const player =
          {
            name: 'P1',
            surname: 'S1',
            sex: Sex.Male,
            birthday: new Date("2001-01-01"),
            rank: Rank.Kyu_5,
            club_id: 0,
            id: 0
          };
        service.addPlayer(player).subscribe(resp => expect(resp).toBe(player));
        const req = backend.expectOne(playersUrl);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(player);
        req.flush(player);
      }));

  it('calls the api url with application/json content type and get method when getPlayer called',
    inject([PlayerService, HttpTestingController],
      (service: PlayerService, backend: HttpTestingController) => {
        const player = {
          name: 'P1',
          surname: 'S1',
          sex: Sex.Male,
          birthday: new Date("2001-01-01"),
          rank: Rank.Kyu_5,
          club_id: 0,
          id: 0
        };
        service.getPlayer(player.id).subscribe(resp => expect(resp).toBe(player));
        const req = backend.expectOne(playersUrl + `${player.id}/`);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('GET');
        req.flush(player);
      }));

  it('calls the api url with application/json content type and post method when updatePlayer called',
    async(inject([PlayerService, HttpTestingController],
      (service: PlayerService, backend: HttpTestingController) => {
        const player = {
          name: 'P1',
          surname: 'S1',
          sex: Sex.Male,
          birthday: new Date("2001-01-01"),
          rank: Rank.Kyu_5,
          club_id: 0,
          id: 0
        };
        service.updatePlayer(player).subscribe(resp => expect(resp).toBe(player));
        const req = backend.expectOne(playersUrl + `${player.id}/`);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(player);
        req.flush(player);
      })));

  it('calls the clubs api url with application/json content type and delete method when deleteClub called',
    async(inject([PlayerService, HttpTestingController],
      (service: PlayerService, backend: HttpTestingController) => {
        const player = {
          name: 'P1',
          surname: 'S1',
          sex: Sex.Male,
          birthday: new Date("2001-01-01"),
          rank: Rank.Kyu_5,
          club_id: 0,
          id: 0
        };
        service.deletePlayer(player).subscribe();
        const req = backend.expectOne(playersUrl + `${player.id}/`);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('DELETE');
      })));
});
