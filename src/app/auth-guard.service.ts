<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permite el acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/movieList']); // Redirige al login si no está autenticado
      alert("Para acceder a la tienda tienes que estar logueado");
      return false;
    }
  }
}
=======
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permite el acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/movieList']); // Redirige al login si no está autenticado
      alert("Para acceder a la tienda tienes que estar logueado");
      return false;
    }
  }
}
>>>>>>> 82394f3 (Subiendo el código del proyecto)
