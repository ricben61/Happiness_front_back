
import { HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor (private tokenStorage: TokenStorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // on recupere une requete en cours d'acheminement, 
        let authReq = req;

        //  on recupere le token
        const token = this.tokenStorage.getToken();
        if (token != null) {
            //  on clone req et on ajoute dans le header "autorization: bearer + token"
            authReq = req.clone({headers : req.headers.set("Authorization", "bearer" + token)});
        }
        // l'intercepteur doit encore laisser la requete vers le back
        return next.handle(authReq)
    }
}

export const AuthInterceptorProviders = [
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
]