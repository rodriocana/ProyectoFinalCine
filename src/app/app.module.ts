<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TiendaComponent } from './tienda/tienda.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';
import { Top250MoviesComponent } from './top250-movies/top250-movies.component';
import { ActorMoviesDetailComponent } from './actor-movies-detail/actor-movies-detail.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth.interceptor';
import { ContactComponent } from './contact/contact.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { MyListComponent } from './my-list/my-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MovieListComponent,
    MovieDetailComponent,
    SliderComponent,
    LoginModalComponent,
    FormularioRegistroComponent,
    TiendaComponent,
    Top250MoviesComponent,
    ActorMoviesDetailComponent,
    HeaderComponent,
    ContactComponent,
    BuyTicketComponent,
    MyListComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirestoreModule,
    FirebaseAppModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    BrowserAnimationsModule,
    ToastModule

  ],
  providers: [
    [MessageService],

    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
=======
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TiendaComponent } from './tienda/tienda.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';
import { Top250MoviesComponent } from './top250-movies/top250-movies.component';
import { ActorMoviesDetailComponent } from './actor-movies-detail/actor-movies-detail.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth.interceptor';
import { ContactComponent } from './contact/contact.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { MyListComponent } from './my-list/my-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MovieListComponent,
    MovieDetailComponent,
    SliderComponent,
    LoginModalComponent,
    FormularioRegistroComponent,
    TiendaComponent,
    Top250MoviesComponent,
    ActorMoviesDetailComponent,
    HeaderComponent,
    ContactComponent,
    BuyTicketComponent,
    MyListComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FirestoreModule,
    FirebaseAppModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    BrowserAnimationsModule,
    ToastModule

  ],
  providers: [
    [MessageService],

    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> 82394f3 (Subiendo el código del proyecto)
