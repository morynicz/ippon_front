import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

class Identifiable {
  id: number;
}

export class CudService<Resource extends Identifiable> {
  private getUrl(id: number): string {
    return `${this.url}${id}/`;
  }
  constructor(private http: HttpClient, private url: string) {
    this.url = url;
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}