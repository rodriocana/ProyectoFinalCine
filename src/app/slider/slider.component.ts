// src/app/slider/slider.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  currentIndex: number = 0;
  intervalId: any;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(response => {
      this.movies = response.body.results;
    });

    // Configura el auto-desplazamiento cada 3 segundos
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  ngOnDestroy(): void {
    // Limpia el intervalo cuando el componente se destruye
    clearInterval(this.intervalId);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.movies.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
  }
}
