import { Tournament } from './tournament';
import { CrudlaServiceSpy } from '../crudla.service.spy';
import { Observable, of } from 'rxjs';

export class TournamentServiceSpy extends CrudlaServiceSpy<Tournament> {

    isStaffValue: number;
    isStaffReturnValue: boolean = false;
    isStaff(id: number): Observable<boolean> {
        this.isStaffValue = id;
        return of(this.isStaffReturnValue);
    }

}
