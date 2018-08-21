import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class CudServiceSpy<Resource> {
  updateValue: Resource;
  update(resource: Resource): Observable<any> {
    this.updateValue = resource;
    return of(true);
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
