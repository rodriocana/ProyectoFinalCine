import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/movie.model';
  //

@Component({
  selector: 'app-actor-movies-detail',
  templateUrl: './actor-movies-detail.component.html',
  styleUrls: ['./actor-movies-detail.component.css']
})
export class ActorMoviesDetailComponent {

  actorId: number | undefined;
  actorMovies: Movie[] = [];
  actorName: string = '';
  actorProfilePath: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router:Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.actorId = id ? +id : undefined; // Convierte a número si es válido

    if (this.actorId) {
      this.getActorDetails(); // Obtiene los detalles del actor
      this.getActorMovies();  // Obtiene las películas del actor
    } else {
      console.error('ID del actor no válido');
    }
  }

  getActorMovies(): void {
    if (this.actorId) { // Verifica que actorId no sea undefined
      this.movieService.getMoviesByActor(this.actorId).subscribe({
        next: (movies) => {
          this.actorMovies = movies; // Asigna las películas al arreglo
        },
        error: (err) => {
          console.error('Error al obtener las películas del actor:', err);
          // Manejo opcional en la UI, como limpiar la lista de películas
          this.actorMovies = [];
        },
      });
    }
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetail', movieId]);
  }

  goToHome(): void {
    this.router.navigate(['/movieList']); // Asegúrate de tener la ruta "/home" definida en tu enrutador
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://www.serieslike.com/img/shop_01.png';
  }

   // Obtiene los detalles del actor
getActorDetails(): void {
  if (this.actorId) {
    this.movieService.getActorDetails(this.actorId).subscribe({
      next: (actor) => {
        this.actorName = actor.name;
        this.actorProfilePath = actor.profile_path;
      },
      error: (err) => {
        console.error('Error al obtener los detalles del actor:', err);
        // Opcional: manejar el error en la interfaz
        this.actorName = 'Información no disponible';
        this.actorProfilePath = 'ruta/de/error/o/imagen/por/defecto';
      },
    });
  }
}

}
