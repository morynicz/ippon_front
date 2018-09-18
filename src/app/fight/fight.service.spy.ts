import { CrudlServiceSpy } from '../crudl.service.spy';
import { Fight } from './fight';
import { Observable, of } from 'rxjs';

export class FightServiceSpy extends CrudlServiceSpy<Fight> {
    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}
