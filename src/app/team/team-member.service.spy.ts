import { TeamMember } from "./team-member";
import { Player } from "../player/player";
import { Observable, of } from "rxjs";

export class TeamMemberServiceSpy {
    getListReturnValue: Player[][] = [];
    getListValues: number[] = [];
    getList(id: number): Observable<Player[]> {
        this.getListValues.push(id);
        return of(this.getListReturnValue.shift());
    }

    getNotAssignedReturnValue: Player[][] = [];
    getNotAssignedValues: number[] = [];
    getNotAssigned(id: number): Observable<Player[]> {
        this.getNotAssignedValues.push(id);
        return of(this.getNotAssignedReturnValue.shift());
    }

    addValue: TeamMember;
    addReturnValue: TeamMember;
    add(resource: TeamMember): Observable<TeamMember> {
        this.addValue = resource;
        return of(this.addValue);
    }
}