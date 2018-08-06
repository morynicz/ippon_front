import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CrudService } from '../crud.service';

import {
  IPPON_HOST,
  POINTS_ENDPOINT
} from '../rest-api';

import { Point } from './point';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class PointService extends CrudService<Point>{
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + POINTS_ENDPOINT);
  }
}
