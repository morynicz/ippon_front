import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Rank } from '../rank';
import { Sex } from '../sex';

import {
  IPPON_HOST,
  PLAYERS_ENDPOINT
} from '../rest-api';

const playersUrl = IPPON_HOST + PLAYERS_ENDPOINT;

import { DeepPlayerService } from './deep-player.service';
import { DeepPlayer } from './deep-player';

describe('DeepPlayerServiceService', () => {
  let service: DeepPlayerService;
  let backend: HttpTestingController;

  const player: DeepPlayer =
  {
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 0,
    id: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeepPlayerService]
    });
    service = TestBed.get(DeepPlayerService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('calls upon proper url and returns \
  result when getPlayersCalled', () => {
      let dummyPlayers: DeepPlayer[] = [
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
      service.getList().subscribe(players => {
        expect(players).toBe(dummyPlayers);
      });
      const req = backend.expectOne(`${playersUrl}`);
      expect(req.request.method).toBe("GET");
      expect(req.request.headers.has('Content-Type')).toBe(true);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush(dummyPlayers);
    });

  it('calls the api url with application/json content type \
  and POST method when addPlayer called',
    () => {
      service.add(player).subscribe(resp => expect(resp).toBe(player));
      const req = backend.expectOne(playersUrl);
      expect(req.request.headers.has('Content-Type')).toBe(true);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(player);
      req.flush(player);
    });

  it('calls the api url with application/json content type \
  and get method when getPlayer called',
    () => {
      service.get(player.id).subscribe(resp => expect(resp).toBe(player));
      const req = backend.expectOne(playersUrl + `${player.id}/`);
      expect(req.request.headers.has('Content-Type')).toBe(true);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.method).toBe('GET');
      req.flush(player);
    });

  it('calls the api url with application/json content type \
  and post method when updatePlayer called',
    () => {
      service.update(player).subscribe(resp => expect(resp).toBe(player));
      const req = backend.expectOne(playersUrl + `${player.id}/`);
      expect(req.request.headers.has('Content-Type')).toBe(true);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toBe(player);
      req.flush(player);
    });

  it('calls the players api url with application/json content \
  type and delete method when delete called',
    () => {
      service.delete(player).subscribe();
      const req = backend.expectOne(playersUrl + `${player.id}/`);
      expect(req.request.headers.has('Content-Type')).toBe(true);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.method).toBe('DELETE');
    });
});
