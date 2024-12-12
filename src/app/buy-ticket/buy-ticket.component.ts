import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
})
export class BuyTicketComponent implements OnInit {

  movie: any;
  user: any;
  selectedTickets: number = 1;
  popcornCombo: boolean = false;
  kitKatCombo: boolean = false;
  selectedTime: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    const movieId = this.activatedRoute.snapshot.params['id'];  // aqui recojo el id de la ruta movieDetail/id y lo guardo en movieId

    if (movieId) {
      this.movieService.getMovieDetails(+movieId).subscribe({
        next: (response) => {
          this.movie = response.body;
        },
        error: (error) => {
          console.error('Error al obtener detalles de la película', error);
        },
      });
    }
  }

  onComboChange(combo: string, event: any): void {
  console.log(`${combo} cambiado a:`, event.target.checked);
}

  calculateTotal(): number {
    let total = this.selectedTickets * 12;
    if (this.popcornCombo) total += 10;
    if (this.kitKatCombo) total += 6;
    return total;
  }

  volver(movieId:number){
  console.log("hola");
  this.router.navigate(['/movieDetail', movieId]);
}

ConfirmarCompra() {

  const total = this.calculateTotal();
  console.log(this.selectedTime, this.selectedTickets, total +  " euros");
  }

}
