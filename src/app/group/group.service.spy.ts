import { CrudfServiceSpy } from "../crudf.service.spy";
import { of, Observable } from "rxjs";
import { Group } from "./group";

export class GroupServiceSpy extends CrudfServiceSpy<Group>{
    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}