import { Club } from "./club";
import { CrudlServiceSpy } from "../crudl.service.spy";
import { of, Observable } from "rxjs";
import { Player } from "../player/player";

export class ClubServiceSpy extends CrudlServiceSpy<Club> {
    getPlayersReturnValues: Player[][] = [];
    getPlayersValues: number[] = [];
    getPlayers(id: number): Observable<Player[]> {
        this.getPlayersValues.push(id);
        return of(this.getPlayersReturnValues.shift());
    }
}