
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
 // Importa el servicio de autenticación
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies: any[] = []; // Películas para mostrar
  sliderImages: any[] = []; // Imágenes para el slider
  currentIndex = 0; // Índice actual del slider
  intervalId: any; // ID del intervalo para cambiar las imágenes
  favoriteMovieIds: Set<number> = new Set(); // IDs de las películas favoritas

  constructor(
    private movieService: MovieService,
    private authService: AuthService, // Servicio de autenticación para favoritos
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadSliderImages();
    this.loadFavoriteMovies();
    // this.messageService.add({ severity: 'info', summary: '', detail: 'CARTELERA', life: 1500 });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (resp) => {
        this.movies = resp.body.results;
      },
      error: (error) => {
        if (error.error.code === 404) {
          console.log(error.error.error);
        }
      },
    });
  }

  private loadSliderImages(): void {
    this.movieService.getSliderImages().subscribe({
      next: (resp) => {
        this.sliderImages = resp.results;
        this.startSlider();
      },
      error: (error) => {
        console.log('Error al obtener imágenes para el slider', error);
      },
    });
  }

  // Iniciar el slider
  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
    }, 3000);
  }

  // Navegar a los detalles de la película
  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetail', movieId]);
  }

  // Manejar errores de carga de imágenes
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://www.serieslike.com/img/shop_01.png';
  }

  // Cargar las películas favoritas del usuario
  loadFavoriteMovies(): void {
    this.authService.getFavoriteMovies().subscribe((favorites) => {
      this.favoriteMovieIds = new Set(favorites.map((fav) => fav.movieId));
    });
  }

  // Verificar si una película está en favoritos
  isFavorite(movieId: number): boolean {
    return this.favoriteMovieIds.has(movieId);
  }

  // Añadir o quitar de favoritos
  toggleFavorite(movie: any, event: Event): void {
    event.stopPropagation(); // Evita que se navegue a los detalles al hacer clic en el icono de favorito
    if (this.authService.isLoggedIn()) {
      if (this.isFavorite(movie.id)) {
        this.authService.removeFavoriteMovie(movie.id).subscribe(() => {
          this.favoriteMovieIds.delete(movie.id);
        });
      } else {
        this.authService.addFavoriteMovie(movie.id).subscribe(() => {
          this.favoriteMovieIds.add(movie.id);
        });
      }
    } else {
      alert('registrate');
    }
  }

  // Verifica si el usuario está logueado para mostrar el botón de favoritos
  showFavoriteButton(): boolean {
    return this.authService.isLoggedIn();
  }
}

