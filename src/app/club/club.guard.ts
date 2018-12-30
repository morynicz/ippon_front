import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authorization/authentication.service';
import { ClubService } from './club.service';

@Injectable()
export class ClubGuard implements CanActivate {

  constructor(
    private clubService: ClubService,
    private authenticationService: AuthenticationService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const id: number = +next.paramMap.get('id');
    let isAdmin: boolean = false;

    return new Observable<boolean>((observer) => {
      if (id && this.authenticationService.authenticated) {
        this.clubService.isAuthorized(id).subscribe(result => {
          observer.next(result);
        }, error => {
          console.log(error);
          observer.next(false);
        });
      } else {
        observer.next(false);
      }
    });
  }
}
