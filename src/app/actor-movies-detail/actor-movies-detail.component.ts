import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
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

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router:Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.actorId = id ? +id : undefined; // Convierte a número si es válido

    if (this.actorId) {
      this.getActorMovies();
    } else {
      // Maneja el caso si actorId es undefined
      console.error('ID del actor no válido');
    }
  }

  getActorMovies(): void {
    if (this.actorId) { // Verifica que actorId no sea undefined
      this.movieService.getMoviesByActor(this.actorId).subscribe(movies => {
        this.actorMovies = movies;
      });
    }
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetail', movieId]);
  }

  goToHome(): void {
    this.router.navigate(['/movieList']); // Asegúrate de tener la ruta "/home" definida en tu enrutador
  }
}
