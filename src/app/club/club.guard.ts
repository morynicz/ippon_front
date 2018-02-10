import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from '../authorization/authorization.service';
import { AuthenticationService } from '../authorization/authentication.service';

@Injectable()
export class ClubGuard implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private authenticationService: AuthenticationService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const id: number = +next.paramMap.get('id');
    let isAdmin: boolean = false;

    return new Observable<boolean>((observer) => {
      console.log("DUPA: " + id);
      if (id && this.authenticationService.authenticated) {
        this.authorizationService.isClubAdmin(id).subscribe(result => {
          console.log("================auth result: " + result);
          observer.next(result.isAuthorized);
        });
      } else {
        observer.next(false);
      }
    });
  }
}
