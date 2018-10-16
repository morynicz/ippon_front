import { CrudfServiceSpy } from "../crudf.service.spy";
import { Team } from "./team";
import { Observable, of } from "rxjs";

export class TeamServiceSpy extends CrudfServiceSpy<Team> {
    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}