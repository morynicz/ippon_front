import { Injectable } from '@angular/core';
import { CUP_PHASES_ENDPOINT, AUTHORIZATION_ENDPOINT, IPPON_HOST, TOURNAMENTS_ENDPOINT } from '../rest-api';
import { HttpClient } from '@angular/common/http';
import { CrudfaService } from '../crudfa.service';
import { CupPhase } from './cup-phase';
import { CupPhaseServiceInterface } from './cup-phase-service-interface';
import { Observable, of } from 'rxjs';
import { PlannedPosition } from './planned-position';

@Injectable({
  providedIn: 'root'
})
export class CupPhaseService extends CrudfaService<CupPhase> implements CupPhaseServiceInterface {
  getPlannedPositions(id: number): Observable<PlannedPosition[]> {
    return of([]);
  }
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + CUP_PHASES_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      CUP_PHASES_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + CUP_PHASES_ENDPOINT)
  }
}

