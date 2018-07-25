import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  IPPON_HOST,
  POINTS_ENDPOINT
} from '../rest-api';

import { Point } from './point';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class PointService {
  private pointUrl: string = IPPON_HOST + POINTS_ENDPOINT;
  private getPointUrl(id: number): string {
    return this.pointUrl + `${id}/`;
  }
  constructor(private http: HttpClient) { }

  addPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(
      this.pointUrl, point, httpOptions)
      .pipe(catchError(this.handleError<any>('addPoint')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  deletePoint(id: number): Observable<{}> {
    return this.http.delete<{}>(
      this.getPointUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>('deletePoint')));
  }
}
