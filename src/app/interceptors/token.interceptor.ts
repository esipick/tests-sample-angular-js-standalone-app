import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAuthService } from '../services/user-auth.service';
import { LocalStoreService } from '../services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: UserAuthService, private ls: LocalStoreService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = this.ls.getItem('Access_Token');
        if (token ) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(request);
    }
}