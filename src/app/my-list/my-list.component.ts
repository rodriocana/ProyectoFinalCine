import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.add({ severity: 'info', summary: '', detail: 'MI LISTA', life: 1500 });
    this.authService.getFavoriteMovies().subscribe(
      (favorites) => {
        // Primero limpiamos la lista para no acumular repetidos en futuras suscripciones
        this.favoriteMovies = [];
          favorites.forEach((favorite) => {
          if (favorite.movieId) {
            // Verificamos si la película ya está en la lista para evitar duplicados
            const alreadyExists = this.favoriteMovies.some(
              (movie) => movie.id === favorite.movieId
            );

            if (!alreadyExists) {
              this.movieService.getMovieDetails(favorite.movieId).subscribe({
                next: (response) => {
                  if (response.body) {
                    this.favoriteMovies.push(response.body);
                  }
                },
                error: (error) => {
                  console.error(
                    'Error al obtener detalles de la película',
                    error
                  );
                },
              });
            }
          }
        });
      },
      (error) => {
        console.error('Error al obtener los favoritos:', error);
      }
    );
  }

  // Función para eliminar una película de favoritos
  removeFromFavorites(movie: any): void {
    // Eliminar de la lista de películas favoritas
    this.favoriteMovies = this.favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    // Aquí deberías llamar al servicio que actualiza los favoritos en la base de datos
    this.authService.removeFavoriteMovie(movie.id).subscribe({
      next: (resp) => {
        console.log('Se ha borrado la pelicula ' + movie.title);
      },
      error: (error) => {},
    });
  }

  goToHome(): void {
    this.router.navigate(['/movieList']); // Asegúrate de tener la ruta "/home" definida en tu enrutador
  }
}
