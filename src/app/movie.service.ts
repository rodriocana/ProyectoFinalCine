// src/app/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '6ce135bf1bb56cee4a7652b7dc4a00b1';
  private apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=1`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl,
    {
      observe: 'response'
    });
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=es-ES`, {observe: 'response'});
  }

  getMovieImages(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`);
  }
}
