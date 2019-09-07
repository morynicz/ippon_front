import { CrudlaServiceInterface } from "../crudla-service-interface";
import { Identifiable } from "../identifiable";
import { CupPhase } from "./cup-phase";
import { PlannedPosition } from "./planned-position";
import { Observable } from "rxjs";

export interface CupPhaseServiceInterface extends CrudlaServiceInterface<CupPhase> {
    getPlannedPositions(id: number): Observable<PlannedPosition[]>;
}