<<<<<<< HEAD
// src/app/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '6ce135bf1bb56cee4a7652b7dc4a00b1';
  private apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=1`;


  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { observe: 'response' });
  }


  getTop250Movies(page: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=es-ES&page=${page}`;
    return this.http.get<any>(url, { observe: 'response' });
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=es-ES`, { observe: 'response' });
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getMovieImages(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`);
  }

  // Método para obtener imágenes para el slider (por ejemplo, películas en tendencia o populares)
  getSliderImages(): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`; // Cambiar esta URL según la fuente de las imágenes
    return this.http.get<any>(url);
  }




  // Método para obtener las películas de un actor ordenadas por fecha orden ascendente
  getMoviesByActor(actorId: number): Observable<any[]> {
    const apiUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        console.log('Respuesta de la API:', response); // Verifica la estructura aquí
        return response.cast
          .filter(movie => movie.release_date) // Filtra películas sin fecha de lanzamiento
          .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()); // Ordena por fecha
      })
    );
  }

  // para acceder a la foto y nombre de los actores
  getActorDetails(actorId: number): Observable<any> {
    const apiUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<any>(apiUrl);
  }

}

// @Injectable({
//   providedIn: 'root'
// })
// export class ImageCacheService {
//   private cache: { [url: string]: boolean } = {};

//   preloadImage(url: string): void {
//     if (!this.cache[url]) {
//       const img = new Image();
//       img.src = url;
//       this.cache[url] = true;
//     }
//   }

//   isImageCached(url: string): boolean {
//     return !!this.cache[url];
//   }
// }
=======
// src/app/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '6ce135bf1bb56cee4a7652b7dc4a00b1';
  private apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=1`;


  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { observe: 'response' });
  }


  getTop250Movies(page: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=es-ES&page=${page}`;
    return this.http.get<any>(url, { observe: 'response' });
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=es-ES`, { observe: 'response' });
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getMovieImages(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}&language=es-ES`);
  }

  // Método para obtener imágenes para el slider (por ejemplo, películas en tendencia o populares)
  getSliderImages(): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`; // Cambiar esta URL según la fuente de las imágenes
    return this.http.get<any>(url);
  }




  // Método para obtener las películas de un actor ordenadas por fecha orden ascendente
  getMoviesByActor(actorId: number): Observable<any[]> {
    const apiUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        console.log('Respuesta de la API:', response); // Verifica la estructura aquí
        return response.cast
          .filter(movie => movie.release_date) // Filtra películas sin fecha de lanzamiento
          .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()); // Ordena por fecha
      })
    );
  }

  // para acceder a la foto y nombre de los actores
  getActorDetails(actorId: number): Observable<any> {
    const apiUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${this.apiKey}&language=es-ES`;
    return this.http.get<any>(apiUrl);
  }

}

// @Injectable({
//   providedIn: 'root'
// })
// export class ImageCacheService {
//   private cache: { [url: string]: boolean } = {};

//   preloadImage(url: string): void {
//     if (!this.cache[url]) {
//       const img = new Image();
//       img.src = url;
//       this.cache[url] = true;
//     }
//   }

//   isImageCached(url: string): boolean {
//     return !!this.cache[url];
//   }
// }
>>>>>>> 82394f3 (Subiendo el código del proyecto)
