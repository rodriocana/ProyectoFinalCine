import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCacheService, MovieService } from '../movie.service';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css'
})
export class BuyTicketComponent {

  movie: any;
  user: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    const movieId = this.activatedRoute.snapshot.params['id'];

    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe({
        next: (response) => {
          this.movie = response.body;

        },
        error: (error) => {
          console.error('Error al obtener detalles de la película', error);
        }
      });
    }
  }

}
