import { Identifiable } from "./identifiable";

import { Observable } from "rxjs";

export interface CrudServiceInterface<Resource extends Identifiable> {
    getList(id: number): Observable<Resource[]>;
    get(id: number): Observable<Resource>;
    update(resource: Resource): Observable<any>;
    add(resource: Resource): Observable<Resource>;
    delete(resource: Resource): Observable<{}>;
}
