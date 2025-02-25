<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-top250-movies',
  templateUrl: './top250-movies.component.html',
  styleUrls: ['./top250-movies.component.css'] // Corregido styleUrls
})
export class Top250MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTop250Movies();
    this.messageService.add({ severity: 'info', summary: '', detail: 'TOP 250', life: 1500 });

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

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://www.serieslike.com/img/shop_01.png';
  }


  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetail', movieId]);
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-top250-movies',
  templateUrl: './top250-movies.component.html',
  styleUrls: ['./top250-movies.component.css'] // Corregido styleUrls
})
export class Top250MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTop250Movies();
    this.messageService.add({ severity: 'info', summary: '', detail: 'TOP 250', life: 1500 });

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

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://www.serieslike.com/img/shop_01.png';
  }


  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movieDetail', movieId]);
  }
}
>>>>>>> 82394f3 (Subiendo el código del proyecto)
