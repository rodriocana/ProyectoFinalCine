import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  isMovieDetailsPage(): boolean {
    // Verifica si la ruta actual contiene 'movie/'
    return this.router.url.includes('movieList');   // si esto es true, se pasa al app-component.html para verificar
  }

  isModalOpen = false;

  openModal() {
    console.log('Modal abierto');
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }


}
