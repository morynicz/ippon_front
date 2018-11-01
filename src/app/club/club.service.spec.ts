import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubService } from './club.service';
import { Club } from './club';
import { User } from '../user';
import { Player } from '../player/player';
import { Rank } from '../rank';
import { Sex } from '../sex';

import {
  IPPON_HOST,
  CLUBS_ENDPOINT,
  ADMINS_ENDPOINT,
  PLAYERS_ENDPOINT
} from '../rest-api';

const clubsUrl = IPPON_HOST + CLUBS_ENDPOINT;

describe('ClubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClubService]
    });
  });

  it('calls the clubs api url with application/json content type and POST method when addClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club =
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 };
        service.add(club).subscribe(resp => expect(resp).toBe(club));
        const req = backend.expectOne(clubsUrl);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(club);
        req.flush(club);
      })));


  it('calls the clubs api url with application/json content type and get method when getClubs called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const clubs = [
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 },
          { name: 'K2', city: 'C2', description: 'D2', webpage: 'W2', id: 1 },
        ];
        service.getList().subscribe(resp => expect(resp).toBe(clubs));
        const req = backend.expectOne(clubsUrl);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('GET');
        req.flush(clubs);
      })));

  it('calls the clubs api url with application/json content type and get method when getClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club =
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 };
        service.get(club.id).subscribe(resp => expect(resp).toBe(club));
        const req = backend.expectOne(clubsUrl + `${club.id}/`);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('GET');
        req.flush(club);
      })));

  it('calls the clubs api url with application/json content type and post method when updateClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        service.update(club).subscribe(resp => expect(resp).toBe(club));
        const req = backend.expectOne(clubsUrl + `${club.id}/`);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(club);
        req.flush(club);
      })));

  it('calls the clubs api url with application/json content type and delete method when deleteClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        service.delete(club).subscribe();
        const req = backend.expectOne(clubsUrl + `${club.id}/`);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('DELETE');
      })));

  it('calls the clubs api url with application/json content type and get method when getPlayers called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const players: Player[] = [{
          name: 'P1',
          surname: 'S1',
          sex: Sex.Male,
          birthday: new Date("2001-01-01"),
          rank: Rank.Kyu_5,
          club_id: 0,
          id: 0
        },
        {
          name: 'P3',
          surname: 'S3',
          sex: Sex.Female,
          birthday: new Date("2002-02-02"),
          rank: Rank.Kyu_4,
          club_id: 0,
          id: 2
        }];
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        service.getPlayers(club.id).subscribe(resp => expect(resp).toBe(players));
        const req = backend.expectOne(clubsUrl + `${club.id}/` + PLAYERS_ENDPOINT);
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('GET');
        req.flush(players);
      })));
});
