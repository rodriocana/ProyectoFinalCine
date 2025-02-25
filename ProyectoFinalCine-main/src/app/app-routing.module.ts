// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FormsModule } from '@angular/forms';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';
import { TiendaComponent } from './tienda/tienda.component';
import { AuthGuardService } from './auth-guard.service';
import { Top250MoviesComponent } from './top250-movies/top250-movies.component';
import { ActorMoviesDetailComponent } from './actor-movies-detail/actor-movies-detail.component';
import { ContactComponent } from './contact/contact.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { MyListComponent } from './my-list/my-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'movieList', component: MovieListComponent },
  { path: 'movieDetail/:id', component: MovieDetailComponent },
  { path: 'registro', component: FormularioRegistroComponent },
  // { path: 'tienda', component: TiendaComponent , canActivate:[AuthGuardService]}, //  para acceder a la tienda con authguard autorizado, si es true.
  { path: 'tienda', component: TiendaComponent},
  {path: 'top250', component: Top250MoviesComponent},
  { path: 'actor/:id', component: ActorMoviesDetailComponent },
  {path: 'contacto', component: ContactComponent},
  {path: 'buyTicket/:id', component: BuyTicketComponent},
  {path: 'myList', component: MyListComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
