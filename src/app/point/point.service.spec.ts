import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PointService } from './point.service';
import { Point, PointType } from './point';

import {
  IPPON_HOST,
  POINTS_ENDPOINT
} from '../rest-api';

const fightId: number = 3;
const playerId: number = 8;
const pointId: number = 13;

describe('PointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PointService], (service: PointService) => {
    expect(service).toBeTruthy();
  }));

  const pointUrl: string = IPPON_HOST + POINTS_ENDPOINT;

  let point: Point = {
    playerId: playerId,
    fightId: fightId,
    type: PointType.Men,
    id: pointId
  }

  describe("when add is called", () => {
    it("calls the points api url",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.add(point)
            .subscribe();
          const req = backend.expectOne(pointUrl);
        }));
    it("uses POST method",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.add(point)
            .subscribe();
          const req = backend.expectOne(pointUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.add(point)
            .subscribe();
          const req = backend.expectOne(pointUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added point",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.add(point)
            .subscribe(response => expect(response).toBe(point));
          const req = backend.expectOne(pointUrl);
          req.flush(point);
        }));
    it("sends the point to be created in body",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.add(point)
            .subscribe();
          const req = backend.expectOne(pointUrl);
          expect(req.request.body).toBe(point);
        }));
  });

  describe("when delete is called", () => {
    it("calls the tournaments api url",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.delete(point)
            .subscribe();
          const req = backend.expectOne(pointUrl + point.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.delete(point)
            .subscribe();
          const req = backend.expectOne(pointUrl + point.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [PointService, HttpTestingController],
        (service: PointService,
          backend: HttpTestingController) => {
          service.delete(point)
            .subscribe();
          const req = backend.expectOne(pointUrl + point.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });


});
