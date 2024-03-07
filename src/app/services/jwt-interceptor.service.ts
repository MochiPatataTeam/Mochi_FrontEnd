import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      try{
        const parsedJwt = JSON.parse(jwt);

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${parsedJwt}`
          }
        });
      } catch(error){
        console.error('Error en el token', error);
      }
    }
    return next.handle(request);
  }
}
