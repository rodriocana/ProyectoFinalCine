import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private user: any;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      this.user = user; // Guardamos la información del usuario autenticado
    });
  }

  getCurrentUser(): any {
    return this.user; // Devuelve la información del usuario actual
  }

  isLoggedIn(): boolean {
    return !!this.user; // Retorna true si hay un usuario autenticado
  }

  addFavoriteMovie(movieId: number) {

    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userRef = this.firestore.collection('Usuarios').doc(user.uid);
          return userRef.collection('favoritos').doc(movieId.toString()).set({ movieId });
        }
        return Promise.reject('User not authenticated');
      }))
  }

  removeFavoriteMovie(movieId: number) {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userRef = this.firestore.collection('Usuarios').doc(user.uid);
          return userRef.collection('favoritos').doc(movieId.toString()).delete();
        }
        return Promise.reject('User not authenticated');
      }))
  }

  getFavoriteMovies(): Observable<any[]> {
    // Retorna un observable que espera a que el usuario esté disponible
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userRef = this.firestore.collection('Usuarios').doc(user.uid);
          return userRef.collection('favoritos').valueChanges(); // Devuelve los favoritos
        } else {
          return []; // Si no hay usuario, retorna un array vacío
        }
      })
    );
  }


}
