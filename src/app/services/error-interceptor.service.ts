import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private errorService: AuthService){}

  // public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return new Observable((observer) => {

  //     next.handle(req).subscribe(
  //       //exito
  //       (res: HttpEvent<any>) => {  //(res: HttpResponse<any>) => {
  //         if (res instanceof HttpResponse) {
  //           observer.next(res);
  //         }
  //       },
  //       (err: HttpErrorResponse) => {
  //         //Manejando errores  
  //         this.errorService.handleError(err);
  //       }
  //     );
  //   });
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.handleError(error); // Manejar el error utilizando el servicio AuthService
        return throwError(error); // Propagar el error para que otros interceptores o suscriptores lo manejen
      })
    );
  }


}
