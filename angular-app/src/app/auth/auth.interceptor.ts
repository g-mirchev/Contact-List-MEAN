/** Imports */
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private userService: UserService, private router: Router) {}
    
    /**
     * Intercepts all http requests to add Authorization header with token
     * where the 'noauth' header isn't present. 
     * 
     * @param req       any request to get intercepted
     * @param next      handler for the cloned request
     */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noauth')){
            return next.handle(req.clone());
        }
        else {
            // Clone the request and attatch jason web token.
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            // Handle the cloned request.
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        }
    }
    
}