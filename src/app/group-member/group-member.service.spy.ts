import { Team } from "../team/team";

import { Observable, of } from "rxjs";

import { GroupMember } from "./group-member";
import { MemberScore } from "./group-member.service";

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
    getScoreReturnValues: Map<number, MemberScore> = new Map<number, MemberScore>();
    getScoreValues: GroupMember[] = [];
    getScore(member: GroupMember): Observable<MemberScore> {
        console.log("called with " + member.team + " size " + this.getScoreReturnValues.size);
        if (!this.getScoreReturnValues.has(member.team)) {
            console.log("No key " + member.team);
            return of({ id: member.team, wins: 0, draws: 0, points: 0 });
        }
        this.getScoreValues.push(member);
        return of(this.getScoreReturnValues.get(member.team));
    }
}