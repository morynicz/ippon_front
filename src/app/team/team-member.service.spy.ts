import { TeamMember } from "./team-member";
import { Player } from "../player/player";
import { Observable, of } from "rxjs";
import { TeamMemberServiceInterface } from "./team-member-service-interface";

export class TeamMemberServiceSpy implements TeamMemberServiceInterface {
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
    add(resource: TeamMember): Observable<any> {
        this.addValues.push(resource);
        return of({});
    }

    deleteValue: TeamMember;
    delete(resource: TeamMember): Observable<any> {
        this.deleteValue = resource;
        return of({});
    }
}