import { CrudlServiceSpy } from '../crudl.service.spy';
import { Fight } from './fight';
import { Observable, of } from 'rxjs';
import { CrudfServiceSpy } from '../crudf.service.spy';

export class FightServiceSpy extends CrudfServiceSpy<Fight> {
    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}
