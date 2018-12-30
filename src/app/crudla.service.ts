import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Authorization } from './authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

class Identifiable {
  id: number;
}

export class CrudlaService<Resource extends Identifiable> {
  private getUrl(id: number): string {
    return `${this.url}${id}/`;
  }
  constructor(protected http: HttpClient,
    private url: string,
    private authorizationUrl: string) { }

  getList(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.url, httpOptions)
      .pipe(catchError(this.handleError('getList', [])));
  }

  get(id: number): Observable<Resource> {
    return this.http.get<Resource>(this.getUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>(`get id=${id}`)));
  }

  update(resource: Resource): Observable<any> {
    return this.http.put(this.getUrl(resource.id), resource, httpOptions)
      .pipe(catchError(this.handleError<any>('update id=${resource.id}')));
  }

  add(resource: Resource): Observable<Resource> {
    return this.http.post(this.url, resource, httpOptions)
      .pipe(catchError(this.handleError<any>('add id=${resource.id}')));
  }

  delete(resource: Resource): Observable<{}> {
    return this.http.delete<Resource>(this.getUrl(resource.id), httpOptions)
      .pipe(
        catchError(this.handleError<Resource>('delete id=${resource.id}'))
      );
  }

  isAuthorized(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Authorization>(this.authorizationUrl + `${id}/`, httpOptions)
        .subscribe(result => {
          observer.next(result.isAuthorized);
        }, error => {
          console.log("isAuthorizedError" + error);
          observer.next(false);
        });
    });
  }
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}

export type Constructable = new (...args: any[]) => {};
