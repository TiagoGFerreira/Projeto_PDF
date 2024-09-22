import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const myToken = localStorage.getItem('token');


  if (myToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`
      }
    });
  }

  return next(req);
};
