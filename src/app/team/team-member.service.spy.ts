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

    addValues: TeamMember[] = [];
    addReturnValues: TeamMember[] = [];
    add(resource: TeamMember): Observable<TeamMember> {
        this.addValues.push(resource);
        return of(this.addReturnValues.shift());
    }

    deleteValue: TeamMember;
    delete(resource: TeamMember): Observable<{}> {
        this.deleteValue = resource;
        return of({});
    }
}