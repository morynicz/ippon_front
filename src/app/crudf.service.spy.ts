import { Observable, of } from 'rxjs';
import { Identifiable } from './identifiable';
import { CrudServiceInterface } from './crud-service-interface';

export class CrudfServiceSpy<Resource extends Identifiable> implements CrudServiceInterface<Identifiable> {
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
    return of(this.addValue);
  }

  deleteValue: Resource;
  delete(resource: Resource): Observable<{}> {
    this.deleteValue = resource;
    return of({});
  }
}
