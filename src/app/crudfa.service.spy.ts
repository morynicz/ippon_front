import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

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

  addValue: Resource;
  addReturnValue: Resource;
  add(resource: Resource): Observable<Resource> {
    this.addValue = resource;
    return of(this.addReturnValue);
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
