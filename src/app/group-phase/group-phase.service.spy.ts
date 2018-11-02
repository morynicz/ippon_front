import { Observable, of } from "rxjs";
import { CrudfServiceSpy } from "../crudf.service.spy";
import { GroupPhase } from "./group-phase";

export class GroupPhaseServiceSpy extends CrudfServiceSpy<GroupPhase> {
    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}