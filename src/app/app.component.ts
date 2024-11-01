import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  isCestaModalOpen: boolean = false;
  productosEnCesta: any[] = []; // Aquí almacenarás los productos en la cest
  isModalOpen = false;

  isMovieDetailsPage(): boolean {
    // Verifica si la ruta actual contiene 'movie/'
    return this.router.url.includes('movieList');   // si esto es true, se pasa al app-component.html para verificar
  }



  openModal() {
    console.log('Modal abierto');
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

   // Método para abrir el modal de cesta
   openCestaModal() {
    this.isCestaModalOpen = true;
  }

  // Método para cerrar el modal de cesta
  closeCestaModal() {
    this.isCestaModalOpen = false;
  }


}
