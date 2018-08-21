import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Point } from './point';
import { CrudfServiceSpy } from '../crudf.service.spy';

export class PointServiceSpy extends CrudfServiceSpy<Point> { }
