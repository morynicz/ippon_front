import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubService } from './club.service';
import { Club } from './club';
import { User } from '../user';
import { Player, Sex, Rank } from '../player/player';

const clubsUrl = 'http://localhost:8000/ippon/clubs/';

describe('ClubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClubService]
    });
  });

  it('should be created', inject([ClubService], (service: ClubService) => {
    expect(service).toBeTruthy();
  }));

  it('calls the clubs api url with application/json content type and POST method when addClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club =
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 };
        service.addClub(club).subscribe(resp => expect(resp).toBe(club));
        const req = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'POST'
          && req.url === clubsUrl));
        req.flush(club);
      })));


  it('calls the clubs api url with application/json content type and get method when getClubs called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const clubs = [
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 },
          { name: 'K2', city: 'C2', description: 'D2', webpage: 'W2', id: 1 },
        ];
        service.getClubs().subscribe(resp => expect(resp).toBe(clubs));
        const req = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'GET'
          && req.url === clubsUrl));
        req.flush(clubs);
      })));

  it('calls the clubs api url with application/json content type and get method when getClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club =
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 };
        service.getClub(0).subscribe(resp => expect(resp).toBe(club));
        const req = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'GET'
          && req.url === clubsUrl + '0/'));
        req.flush(club);
      })));

  it('calls the clubs api url with application/json content type and post method when updateClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        service.updateClub(club).subscribe(resp => expect(resp).toBe(club));
        const req = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'PUT'
          && req.url === clubsUrl + '0/'));
        req.flush(club);
      })));

  it('calls the clubs api url with application/json content type and delete method when deleteClub called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        service.deleteClub(club).subscribe();
        const req = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'DELETE'
          && req.url === clubsUrl + '0/'));
      })));

  it('calls the clubs api url with application/json content type and get method when getClubs called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const admins: User[] = [
          {
            id: 0,
            name: 'N0'
          }, {
            id: 2,
            name: 'N2'
          }
        ];
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        service.getAdmins(club).subscribe(resp => expect(resp).toBe(admins));
        const req = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'GET'
          && req.url === clubsUrl + club.id + '/admins/'));
        req.flush(admins);
      })));

  it('calls the api url with json content type and POST method when addClubAdmin called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club: Club =
          { name: 'K1', city: 'C1', description: 'D1', webpage: 'W1', id: 0 };
        const user: User = { id: 4, name: 'u4' };
        const admins: User[] = [
          { id: 4, name: 'u4' }
        ];
        service.addClubAdmin(club, user).subscribe(resp => expect(resp).toBe(admins));
        const reqest = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'POST'
          && req.url === clubsUrl + club.id + '/admins/'));
        reqest.flush(admins);
      })));

  it('calls the clubs api url with application/json content type and delete method when deleteClubAdmin called',
    async(inject([ClubService, HttpTestingController],
      (service: ClubService, backend: HttpTestingController) => {
        const club: Club =
          { name: 'P1', city: 'F1', description: 'D1', webpage: 'W1', id: 0 };
        const user: User = { id: 4, name: 'u4' };
        const admins: User[] = [];
        service.deleteClubAdmin(club, user).subscribe();
        const request = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'DELETE'
          && req.url === clubsUrl + club.id + '/admins/' + user.id));
        request.flush(admins);
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
        service.getPlayers(club).subscribe(resp => expect(resp).toBe(players));
        const reqest = backend.expectOne((req) => (
          req.headers.has('Content-Type')
          && req.headers.get('Content-Type') === 'application/json'
          && req.method === 'GET'
          && req.url === clubsUrl + club.id + '/players/'));
        reqest.flush(players);
      })));
});
