import { Observable, of } from 'rxjs';

export class RldaServiceSpy<Resource> {
    getListReturnValues: Resource[][] = [];
    getListValue: number = 0;
    getList(): Observable<Resource[]> {
        this.getListValue += 1;
        return of(this.getListReturnValues.shift());
    }

    getReturnValues: Resource[] = [];
    getValues: number[] = [];
    get(id: number): Observable<Resource> {
        this.getValues.push(id);
        return of(this.getReturnValues.shift());
    }

    deleteValue: Resource;
    delete(resource: Resource): Observable<{}> {
        this.deleteValue = resource;
        return of({});
    }

    isAuthorizedValue: number;
    isAuthorizedReturnValue: boolean = false;
    isAuthorized(id: number): Observable<boolean> {
        this.isAuthorizedValue = id;
        return of(this.isAuthorizedReturnValue);
    }
}
