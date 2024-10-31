
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  backdrops: string[] = [];
  trailerUrl: string | null = null; // Agregar propiedad para el trailer

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
          this.backdrops = response.backdrops.slice(0, 20).map((img: any) => `https://image.tmdb.org/t/p/w500${img.file_path}`);
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

  goBack(): void {
    this.router.navigate(['/movies']);
  }

  openTrailer(): void { // Método para abrir el trailer
    if (this.trailerUrl) {
      window.open(this.trailerUrl, '_blank'); // Abre el trailer en una nueva pestaña
    }
  }
}
