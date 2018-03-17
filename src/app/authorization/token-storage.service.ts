import { Injectable } from '@angular/core';

@Injectable()
export class TokenStorageService {

  constructor() { }

  getAccess() {
    return localStorage.getItem('access');
  }

  getRefresh() {
    return localStorage.getItem('refresh');
  }

  setAccess(token: string) {
    localStorage.setItem('access', token);
  }

  setRefresh(token: string) {
    localStorage.setItem('refresh', token);
  }

  clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

}
