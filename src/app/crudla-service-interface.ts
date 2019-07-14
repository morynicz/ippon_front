import { CrudServiceInterface } from "./crud-service-interface";
import { AuthCheckingServiceInterface } from "./auth-checking-service-interface";
import { Identifiable } from "./identifiable";

export interface CrudlaServiceInterface<Resource extends Identifiable> extends CrudServiceInterface<Identifiable>, AuthCheckingServiceInterface {
}
