import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCacheService, MovieService } from '../movie.service';
import { AuthService } from '../services/auth-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  actors: any[] = [];
  isFavorite:boolean = false;
  selectedTrailerUrl: SafeResourceUrl;
  showTrailerModal: boolean = false;
  isNowPlaying: boolean = false; // Nueva propiedad para verificar en el html si está en cartelera para que no salga el boton comprarEntrada.

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private imageCacheService: ImageCacheService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    const movieId = this.activatedRoute.snapshot.params['id'];

    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe({
        next: (response) => {
          this.movie = response.body;
          this.checkIfNowPlaying(); // Llamamos al método para verificar si está en cartelera
        },
        error: (error) => {
          console.error('Error al obtener detalles de la película', error);
        }
      });

      this.movieService.getMovieImages(+movieId).subscribe({
        next: (response) => {
          this.backdrops = response.backdrops.slice(0, 20).map((img: any) => `https://image.tmdb.org/t/p/original${img.file_path}`);
        },
        error: (error) => {
          console.error('Error al obtener imágenes de la película', error);
        }
      });

      this.movieService.getMovieVideos(+movieId).subscribe({
        next: (response) => {
          const trailer = response.results.find((video: any) => video.type === 'Trailer');
          this.trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
        },
        error: (error) => {
          console.error('Error al obtener videos de la película', error);
        }
      });

      this.movieService.getMovieCredits(+movieId).subscribe({
        next: (response) => {
          this.actors = response.cast.slice(0, 5);
        },
        error: (error) => {
          console.error('Error al obtener el elenco de la película', error);
        }
      });
    }
  }

  // esta funcion para poder crear una condicion if en el html y mostrar el boton comprarEntrada en las peliculas en estreno solo, las de la funcion getMovies.
  checkIfNowPlaying(): void {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        const nowPlayingMovies = response.body.results;
        this.isNowPlaying = nowPlayingMovies.some((movie: any) => movie.id === this.movie.id); // some devuelve true o false, si isNowPlaying es true, mostrará el boton comprarEntrada en el html
      },
      error: (error) => {
        console.error('Error al verificar si la película está en cartelera', error);
      }
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    const movieId = this.movie.id;

    if (this.isFavorite) {
      this.authService.addFavoriteMovie(movieId)
      .subscribe({
        next: resp => {
          console.log("Se ha agrageado a favoritos la pelicula " + this.movie.title )
        },
        error: error => {
          console.log("No se ha podido agregar la pelicula");
        }
      });
    } else {
      this.authService.removeFavoriteMovie(movieId)
      .subscribe({
        next: resp => {
          console.log("Se ha borrado la pelicula " + this.movie.title )
        },
        error: error => {
            console.log("No se ha podido eliminar la pelicula");
        }
      });
    }
  }

    goToActorMovies(actorId: number) {
      this.router.navigate(['/actor', actorId]); // Aquí se asume que tienes una ruta '/actor/:id'
  }

     goToBuyTicket(movieId:number){

      this.router.navigate(['buyTicket', movieId]);

  }

  showSynopsisModal: boolean = false;

  verSinopsis(): void {
    this.showSynopsisModal = true;
  }

  closeSynopsisModal(): void {
    this.showSynopsisModal = false;
  }

  // openTrailer(): void {
  //   if (this.trailerUrl) {
  //     window.open(this.trailerUrl, '_blank');
  //   }
  // }

  openImage(backdrop: string): void {
    this.selectedImage = backdrop;
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  openTrailer() {
    const videoId = this.trailerUrl.split('v=')[1]; // Extrae el ID del video de la URL
    const unsafeUrl = `https://www.youtube.com/embed/${videoId}`;
    this.selectedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl); // Sanitiza la URL
    this.showTrailerModal = true; // Muestra el modal del trailer
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://www.serieslike.com/img/shop_01.png';
  }

closeTrailerModal() {
  this.showTrailerModal = false;
  this.selectedTrailerUrl = ''; // Limpia la URL para evitar mostrar el trailer después de cerrarlo
}
}
