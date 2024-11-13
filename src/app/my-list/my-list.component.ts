import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent {

  favoriteMovies: any[] = [];

  constructor(private authService: AuthService, private movieService: MovieService, private router:Router) {}

  ngOnInit(): void {
    this.authService.getFavoriteMovies()
      .then(favoritesSnapshot => {
        favoritesSnapshot?.subscribe((favorites: any[]) => {
          this.favoriteMovies = [];
          favorites.forEach(favorite => {
            this.movieService.getMovieDetails(favorite.movieId).subscribe({
              next: (response) => this.favoriteMovies.push(response.body),
              error: (error) => console.error('Error al obtener detalles de la película', error)
            });
          });
        });
      })
      .catch(error => console.error('Error al obtener los favoritos', error));
  }

  // Función para eliminar una película de favoritos
  removeFromFavorites(movie: any): void {
    // Eliminar de la lista de películas favoritas
    this.favoriteMovies = this.favoriteMovies.filter(favMovie => favMovie.id !== movie.id);

    // Aquí deberías llamar al servicio que actualiza los favoritos en la base de datos
    this.authService.removeFavoriteMovie(movie.id)
      .then(() => {
        console.log(`Película eliminada de favoritos: ${movie.title}`);
      })
      .catch(error => {
        console.error('Error al eliminar película de favoritos', error);
      });
  }

  goToHome(): void {
    this.router.navigate(['/movieList']); // Asegúrate de tener la ruta "/home" definida en tu enrutador
  }
}
