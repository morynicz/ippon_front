import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PointService } from './point.service';
import { Point, PointType } from './point';

import {
  IPPON_HOST,
  POINTS_ENDPOINT,
  FIGHTS_ENDPOINT
} from '../rest-api';

const fightId: number = 3;
const playerId: number = 8;
const pointId: number = 13;

describe('PointService', () => {
  let service: PointService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(PointService);
    backend = TestBed.get(HttpTestingController);
  });

  const pointUrl: string = IPPON_HOST + POINTS_ENDPOINT;

  let point: Point = {
    player: playerId,
    fight: fightId,
    type: PointType.Men,
    id: pointId
  }

  describe("when add is called", () => {
    it("calls the points api url, uses POST method, \
    sends request with application/json content type headers, \
    sends the point to be created in body and \
    returns newly added point",
      () => {
        service.add(point)
          .subscribe(response => expect(response).toBe(point));
        const req = backend.expectOne(pointUrl);
        req.flush(point);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(point);
      });
  });

  describe("when delete is called", () => {
    it("calls the tournaments api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(point)
          .subscribe();
        const req = backend.expectOne(pointUrl + point.id + '/');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getList is called", () => {
    let fightId: number = 3;
    let filteredUrl = IPPON_HOST + FIGHTS_ENDPOINT + `${fightId}/` + POINTS_ENDPOINT;
    let points: Point[] = [
      point,
      {
        player: 7,
        fight: 8,
        type: PointType.Kote,
        id: 12
      }];

    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers \
    and returns requested points",
      () => {
        service.getList(fightId)
          .subscribe(response => expect(response)
            .toBe(points));
        const req = backend.expectOne(filteredUrl);
        req.flush(points);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });
});
