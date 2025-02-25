
// src/app/slider/slider.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  movies: any[] = [];
  currentIndex: number = 0;
  intervalId: any;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(response => {
      this.movies = response.body.results;
    });

    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.movies.length;
    this.restartAutoSlide();
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
    this.restartAutoSlide();
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2500);
  }

  private clearAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartAutoSlide(): void {
    this.clearAutoSlide();
    this.startAutoSlide();
  }
}
