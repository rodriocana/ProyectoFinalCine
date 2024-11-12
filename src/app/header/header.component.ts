import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isCestaModalOpen: boolean = false;
  productosEnCesta: any[] = [];
  isModalOpen = false;
  user$: Observable<any> | undefined;
  userName: string | null = null; // Para almacenar el nombre del usuario
  token:string = "";
  menuOpen: boolean = false; // Variable para controlar el estado del menú
  avatar: any;

  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private auth:AuthService) {}

  ngOnInit() {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        console.log("Usuario autenticado:", user);
        this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe({
          next: (resp:any) => {
            if (resp) {
              this.userName = resp.nombre;
              this.avatar = resp.avatar
              this.closeModal();
              console.log(this.auth.isLoggedIn());
            }
          },
          error: error => {
          },
        });

        localStorage.setItem("token", user.refreshToken);

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
      localStorage.clear();
      console.log("localstorage borrado")
      this.router.navigate(['/']); // Redirige a la página principal
    });
  }

   // Método para alternar el estado del menú
   toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}

