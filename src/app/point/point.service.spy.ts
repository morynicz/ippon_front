import { Observable ,  of } from 'rxjs';

import { Point } from './point';
import { CrudfServiceSpy } from '../crudf.service.spy';

export class PointServiceSpy extends CrudfServiceSpy<Point> { }
