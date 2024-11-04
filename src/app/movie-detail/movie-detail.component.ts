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


  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private imageCacheService: ImageCacheService, // Inyectar el servicio de caché,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser(); // para traer al usuario logueado en ese momento.
    const movieId = this.activatedRoute.snapshot.params['id'];
    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe(
        response => {
          this.movie = response.body;
        },
        error => {
          console.error('Error al obtener detalles de la pelicula', error);
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
          this.trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null; // Guarda la URL del trailer
        },
        error => {
          console.error('Error al obtener videos de la película', error);
        }
      );
    }
  }



  verSinopsis(): void {
    alert(this.movie.overview);
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
