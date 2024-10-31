// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FormsModule } from '@angular/forms';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'movieList', component: MovieListComponent },
  { path: 'movieDetail/:id', component: MovieDetailComponent },
  { path: 'registro', component: FormularioRegistroComponent }, // Nueva ruta para el registro


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
