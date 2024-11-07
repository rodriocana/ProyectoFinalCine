import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCestaModalOpen: boolean = false;
  productosEnCesta: any[] = [];
  isModalOpen = false;
  user$: Observable<any> | undefined;
  userName: string | null = null; // Para almacenar el nombre del usuario
  token:string = "";

  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private auth:AuthService) {}

  ngOnInit() {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        console.log("Usuario autenticado:", user);
        this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe((userData: any) => {
          if (userData) {
            this.userName = userData.nombreUsuario; // Asumiendo que 'nombre' es un campo en tu colección de usuarios
            localStorage.setItem("token", user.refreshToken);
            this.closeModal();
            console.log(this.auth.isLoggedIn());

          }
        });
      } else {
        console.log("No hay usuario autenticado");
        this.userName = null; // Resetea el nombre si no hay usuario
      }
    });
  }

  isMovieDetailsPage(): boolean {
    return this.router.url.includes('movieList') || this.router.url.includes('tienda') || this.router.url.includes('top250');
  }

  openModal() {
    console.log('Modal abierto');
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.userName = null; // Resetea el nombre del usuario después de cerrar sesión
      this.router.navigate(['/']); // Redirige a la página principal
    });
  }
}
