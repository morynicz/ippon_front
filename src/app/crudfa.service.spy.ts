import { Observable, of } from 'rxjs';

export class CrudfaServiceSpy<Resource> {
  updateValue: Resource;
  update(resource: Resource): Observable<any> {
    this.updateValue = resource;
    return of(true);
  }

  getListReturnValues: Resource[][] = [];
  getListValue: number[] = [];
  getList(id: number): Observable<Resource[]> {
    this.getListValue.push(id);
    return of(this.getListReturnValues.shift());
  }

  getReturnValues: Resource[] = [];
  getValues: number[] = [];
  get(id: number): Observable<Resource> {
    this.getValues.push(id);
    return of(this.getReturnValues.shift());
  }

  addValues: Resource[] = [];
  addReturnValues: Resource[] = [];
  add(resource: Resource): Observable<Resource> {
    this.addValues.push(resource);
    return of(this.addReturnValues.shift());
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
