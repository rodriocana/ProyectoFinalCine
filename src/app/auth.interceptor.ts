<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
 // Para obtener el token

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // en esta funcion dejo pasar estas rutas para mostrar los datos de la api sin necesidad de estar logueado y tener un token el cual comparo en cada
    // componente
    if (this.router.url.includes('movieList') || (this.router.url.includes(""))){
      return next.handle(request);
    }

    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, se genera un error HTTP 401
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'No autorizado' }));
    }

    // Si el token existe, modificamos la URL para agregar el token como parámetro
    const clonedRequest = request.clone({url: this.addAuthTokenToUrl(request.url, token),  // Añadir token como parámetro en la URL
    });

    return next.handle(clonedRequest);
  }


  // Función que añade el token como parámetro a la URL
  private addAuthTokenToUrl(url: string, token: string): string {
    const urlObj = new URL(url, window.location.origin);  // Crear un objeto URL desde la URL base

    urlObj.searchParams.set('auth', token);  // Añadir el parámetro 'auth' con el token

    return urlObj.toString();  // Devolver la URL modificada
  }
}
=======
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
 // Para obtener el token

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // en esta funcion dejo pasar estas rutas para mostrar los datos de la api sin necesidad de estar logueado y tener un token el cual comparo en cada
    // componente
    if (this.router.url.includes('movieList') || (this.router.url.includes(""))){
      return next.handle(request);
    }

    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, se genera un error HTTP 401
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'No autorizado' }));
    }

    // Si el token existe, modificamos la URL para agregar el token como parámetro
    const clonedRequest = request.clone({url: this.addAuthTokenToUrl(request.url, token),  // Añadir token como parámetro en la URL
    });

    return next.handle(clonedRequest);
  }


  // Función que añade el token como parámetro a la URL
  private addAuthTokenToUrl(url: string, token: string): string {
    const urlObj = new URL(url, window.location.origin);  // Crear un objeto URL desde la URL base

    urlObj.searchParams.set('auth', token);  // Añadir el parámetro 'auth' con el token

    return urlObj.toString();  // Devolver la URL modificada
  }
}
>>>>>>> 82394f3 (Subiendo el código del proyecto)
