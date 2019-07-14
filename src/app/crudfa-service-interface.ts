import { Identifiable } from "./identifiable";
import { CrudServiceInterface } from "./crud-service-interface";
import { AuthCheckingServiceInterface } from "./auth-checking-service-interface";

export interface CrudfaServiceInterface<Resource extends Identifiable> extends CrudServiceInterface<Identifiable>, AuthCheckingServiceInterface {
}
