import { CupPhase } from "./cup-phase";
import { CrudfaServiceSpy } from "../crudfa.service.spy";
import { PlannedPosition } from "./planned-position";
import { CupPhaseServiceInterface } from "./cup-phase-service-interface";
import { Observable, of } from "rxjs";

export class CupPhaseServiceSpy extends CrudfaServiceSpy<CupPhase> implements CupPhaseServiceInterface {
    getPlannedPositions(id: number): Observable<PlannedPosition[]> {
        this.getPlannedPositionsValues.push(id);
        return of(this.getPlannedPositionsReturnValues.shift());
    }
    getPlannedPositionsReturnValues: PlannedPosition[][] = [];
    getPlannedPositionsValues: number[] = [];
}