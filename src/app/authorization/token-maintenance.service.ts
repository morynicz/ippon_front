import { Injectable } from '@angular/core';
import { JwtHelperWrapperService } from './jwt-helper-wrapper.service';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTHENTICATION_HOST, AUTHENTICATION_ENDPOINT, TOKEN_ENDPOINT, REFRESH_ENDPOINT } from '../rest-api';
import { Token } from './authentication.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TokenMaintenanceService {
  private authenticationUrl: string = AUTHENTICATION_HOST
    + AUTHENTICATION_ENDPOINT;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperWrapperService,
    private tokenStorage: TokenStorageService) {
  }

  updateTokens(): void {
    this.updateTokensIfNecessary().subscribe(() => { });
  }

  private updateTokensIfNecessary(): Observable<boolean> {
    const access_token: string = this.tokenStorage.getAccess();
    const refresh_token: string = this.tokenStorage.getRefresh();
    return new Observable((observer) => {
      if (refresh_token != null && this.jwtHelper.isExpired(access_token)) {
        this.http.post<Token>(this.authenticationUrl + TOKEN_ENDPOINT + REFRESH_ENDPOINT,
          { "refresh": refresh_token }, httpOptions)
          .subscribe(res => {
            this.setSession(res);
            observer.next(true);
            observer.complete();
          }, error => {
            this.tokenStorage.clearTokens();
            observer.next(false);
            observer.complete();
          }
          );
      } else {
        observer.next(access_token != null);
        observer.complete();
      }
    });
  }

  private setSession(authResult) {
    this.tokenStorage.setAccess(authResult.access);
    this.tokenStorage.setRefresh(authResult.refresh);
  }
}
