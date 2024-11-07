import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-top250-movies',
  templateUrl: './top250-movies.component.html',
  styleUrls: ['./top250-movies.component.css'] // Corregido styleUrls
})
export class Top250MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadTop250Movies();
  }

  // esta funcion está mejorada para que cargue las paginas de la 1 a la 4 correctamente.
  loadTop250Movies(): void {
    const pages = [1, 2, 3, 4];

    of(...pages).pipe(
      concatMap(page => this.movieService.getTop250Movies(page))
    ).subscribe({
      next: resp => {
        this.movies = this.movies.concat(resp.body.results); // Combina los resultados de cada página
      },
      error: error => {
        if (error.error.code === 404) {
          console.log(error.error.error);
        }
      }
    });
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetail', movieId]);
  }
}
