import { Team } from "../team/team";

import { Observable, of } from "rxjs";

import { GroupMember } from "./group-member";

export class GroupMemberServiceSpy {
    getListReturnValue: Team[][] = [];
    getListValues: number[] = [];
    getList(id: number): Observable<Team[]> {
        this.getListValues.push(id);
        return of(this.getListReturnValue.shift());
    }

    getNotAssignedReturnValue: Team[][] = [];
    getNotAssignedValues: number[] = [];
    getNotAssigned(id: number): Observable<Team[]> {
        this.getNotAssignedValues.push(id);
        return of(this.getNotAssignedReturnValue.shift());
    }

    addValue: GroupMember;
    addReturnValue: GroupMember;
    add(resource: GroupMember): Observable<GroupMember> {
        this.addValue = resource;
        return of(this.addValue);
    }

    deleteValue: GroupMember;
    delete(resource: GroupMember): Observable<{}> {
        this.deleteValue = resource;
        return of({});
    }
}