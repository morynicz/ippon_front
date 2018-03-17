import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtHelperWrapperService {
  private helper = new JwtHelperService();
  constructor() { }

  decodeToken(token: string): string {
    return this.helper.decodeToken(token);
  }

  expirationDate(token: string): Date {
    return this.helper.getTokenExpirationDate(token);
  }

  isExpired(token: string): boolean {
    return this.helper.isTokenExpired(token);
  }

}
