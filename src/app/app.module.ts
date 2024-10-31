import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SliderComponent } from './slider/slider.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MovieListComponent,
    MovieDetailComponent,
    SliderComponent,
    LoginModalComponent,
    FormularioRegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
