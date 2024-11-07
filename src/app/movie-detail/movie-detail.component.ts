import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCacheService, MovieService } from '../movie.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  backdrops: string[] = [];
  trailerUrl: string | null = null;
  user: any;
  selectedImage: string | null = null;
  actors: any[] = [];  // Añadir esta propiedad para almacenar los actores
  isFavorite = false; // Estado de favoritos para la película actual


  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private imageCacheService: ImageCacheService, // Inyectar el servicio de caché,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser(); // Para traer al usuario logueado
    const movieId = this.activatedRoute.snapshot.params['id'];
    if (movieId) {
      // Obtener detalles de la película
      this.movieService.getMovieDetails(+movieId).subscribe(
        response => {
          this.movie = response.body;
        },
        error => {
          console.error('Error al obtener detalles de la película', error);
        }
      );

      // Obtener las imágenes de fondo
      this.movieService.getMovieImages(+movieId).subscribe(
        response => {
          this.backdrops = response.backdrops.slice(0, 20).map((img: any) => `https://image.tmdb.org/t/p/original${img.file_path}`);
        },
        error => {
          console.error('Error al obtener imágenes de la película', error);
        }
      );

      // Obtener el trailer
      this.movieService.getMovieVideos(+movieId).subscribe(
        response => {
          const trailer = response.results.find((video: any) => video.type === 'Trailer');
          this.trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
        },
        error => {
          console.error('Error al obtener videos de la película', error);
        }
      );

      // Obtener el elenco de la película
      this.movieService.getMovieCredits(+movieId).subscribe(
        response => {
          this.actors = response.cast.slice(0, 5); // Obtener los primeros 5 actores, puedes modificar esto según tu necesidad
        },
        error => {
          console.error('Error al obtener el elenco de la película', error);
        }
      );
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      // Lógica para añadir a favoritos
      console.log('Película añadida a favoritos');
    } else {
      // Lógica para eliminar de favoritos
      console.log('Película eliminada de favoritos');
    }
  }

    goToActorMovies(actorId: number) {
      this.router.navigate(['/actor', actorId]); // Aquí se asume que tienes una ruta '/actor/:id'
  }

  showSynopsisModal: boolean = false;

  verSinopsis(): void {
    this.showSynopsisModal = true;
  }

  closeSynopsisModal(): void {
    this.showSynopsisModal = false;
  }

  openTrailer(): void {
    if (this.trailerUrl) {
      window.open(this.trailerUrl, '_blank');
    }
  }

  openImage(backdrop: string): void {
    this.selectedImage = backdrop;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
