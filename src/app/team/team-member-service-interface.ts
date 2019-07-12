import { TeamMember } from "./team-member";

import { Observable } from "rxjs";
import { Player } from "../player/player";

export interface TeamMemberServiceInterface {
    add(resource: TeamMember): Observable<any>;
    getList(id: number): Observable<Player[]>;
    delete(resource: TeamMember): Observable<any>;
    getNotAssigned(id: number): Observable<Player[]>;
}
