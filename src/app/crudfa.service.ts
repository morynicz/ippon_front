import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Authorization } from './authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

class Identifiable {
  id: number;
}

export class CrudfaService<Resource extends Identifiable> {
  private getUrl(id: number): string {
    return `${this.url}${id}/`;
  }
  constructor(
    protected http: HttpClient,
    private url: string,
    private filterUrlPrefix: string,
    private filterUrlSuffix: string,
    private authorizationUrl: string) {
  }

  getList(id: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(
      this.filterUrlPrefix + `${id}/` + this.filterUrlSuffix, httpOptions)
      .pipe(catchError(this.handleError([])));
  }

  get(id: number): Observable<Resource> {
    return this.http.get<Resource>(this.getUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>()));
  }

  update(resource: Resource): Observable<any> {
    return this.http.put(this.getUrl(resource.id), resource, httpOptions)
      .pipe(catchError(this.handleError<any>()));
  }

  add(resource: Resource): Observable<Resource> {
    return this.http.post(this.url, resource, httpOptions)
      .pipe(catchError(this.handleError<any>()));
  }

  delete(resource: Resource): Observable<{}> {
    return this.http.delete<Resource>(this.getUrl(resource.id), httpOptions)
      .pipe(
        catchError(this.handleError<Resource>())
      );
  }

  isAuthorized(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Authorization>(this.authorizationUrl + `${id}/`)
        .subscribe(result => {
          observer.next(result.isAuthorized);
        }, error => {
          console.log(error);
          observer.next(false);
        });
    });
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
