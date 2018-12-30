import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PlayerService } from './player.service';
import { Player } from './player'
import { Rank } from '../rank';
import { Sex } from '../sex';

import {
  IPPON_HOST,
  PLAYERS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';

const playersUrl = IPPON_HOST + PLAYERS_ENDPOINT;

describe('PlayerService', () => {
  let service: PlayerService;
  let backend: HttpTestingController;

  const player: Player =
  {
    name: 'P1',
    surname: 'S1',
    id: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService]
    });
    service = TestBed.get(PlayerService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('calls upon proper url and returns \
  result when getList is called', () => {
      let dummyPlayers: Player[] = [
        {
          name: 'P1',
          surname: 'S1',
          id: 0
        },
        {
          name: 'P2',
          surname: 'S2',
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
  and get method when get is called',
    () => {
      service.get(player.id).subscribe(resp => expect(resp).toBe(player));
      const req = backend.expectOne(playersUrl + `${player.id}/`);
      expect(req.request.headers.has('Content-Type')).toBe(true);
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.method).toBe('GET');
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

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + PLAYERS_ENDPOINT + `${player.id}/`;
    it("calls the fights api url and returns requested authorization",
      () => {
        service.isAuthorized(player.id)
          .subscribe(response => expect(response)
            .toBe(true));
        const req = backend.expectOne(authUrl);
        req.flush({ "isAuthorized": true });
        expect(req.request.method).toBe('GET');
      });
  });

});
