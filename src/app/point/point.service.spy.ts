import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Point } from './point';
import { CrudServiceSpy } from '../crud.service.spy';

export class PointServiceSpy extends CrudServiceSpy<Point> { }
