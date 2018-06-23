import { Injectable, Injector } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.tokenStorage.getAccess();
    if (idToken) {
      const cloned = req.clone({ headers: req.headers.set("Authorization", "Bearer " + idToken) });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
