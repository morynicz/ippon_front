import { CrudfServiceSpy } from "../crudf.service.spy";
import { TeamFight } from "./team-fight";
import { Observable, of } from "rxjs";

export class TeamFightServiceSpy extends CrudfServiceSpy<TeamFight> {
    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}