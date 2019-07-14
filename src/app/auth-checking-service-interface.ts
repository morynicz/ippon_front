import { Observable } from "rxjs";

export interface AuthCheckingServiceInterface {
    isAuthorized(id: number): Observable<boolean>;
}
