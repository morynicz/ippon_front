import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Player } from './player';
import { PLAYERS } from "./mock-players";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class PlayerService {
  private playersUrl = "api/players";
  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    // return of(PLAYERS);
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(catchError(this.handleError('getPlayers', [])));
  }

  getPlayer(id: number): Observable<Player> {
    // return of(PLAYERS.find(player => player.id === id));
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url)
      .pipe(catchError(this.handleError(`getHero id=${id}`, new Player())));
  }

  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, httpOptions).pipe(catchError(this.handleError<any>('updateHero')));
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post(this.playersUrl, player, httpOptions).pipe(catchError(this.handleError<any>('updateHero')));
  }

  deletePlayer(player: Player): Observable<Player> {
    const url = `${this.playersUrl}/${player.id}`;
    return this.http.delete<Player>(url, httpOptions).pipe(
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}