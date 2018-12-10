import { Observable ,  of } from 'rxjs';

export class CrudServiceSpy<Resource> {
  updateValue: Resource;
  update(resource: Resource): Observable<any> {
    this.updateValue = resource;
    return of(true);
  }

  getListReturnValue: Resource[];
  getListValue: number = 0;
  getList(): Observable<Resource[]> {
    this.getListValue += 1;
    return of(this.getListReturnValue);
  }

  getReturnValue: Resource;
  getValue: number;
  get(id: number): Observable<Resource> {
    this.getValue = id;
    return of(this.getReturnValue);
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
