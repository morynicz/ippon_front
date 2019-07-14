import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudfService } from '../crudf.service';

import {
  IPPON_HOST,
  POINTS_ENDPOINT,
  FIGHTS_ENDPOINT
} from '../rest-api';

import { Point } from './point';


@Injectable()// FUCK TYPESCRIPT
export class PointService extends CrudfService<Point>{
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + POINTS_ENDPOINT,
      IPPON_HOST + FIGHTS_ENDPOINT,
      POINTS_ENDPOINT);
  }
}
