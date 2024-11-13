import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any; // Almacenar la información del usuario

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

  getUserData() {
    if (this.user) {
      return this.firestore.collection('Usuarios').doc(this.user.uid).valueChanges();
    }
    return null;
  }

  addFavoriteMovie(movieId: number) {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userRef = this.firestore.collection('users').doc(user.uid);
        return userRef.collection('favorites').doc(movieId.toString()).set({ movieId });
      }
      return Promise.reject('User not authenticated');
    });
  }

  removeFavoriteMovie(movieId: number) {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userRef = this.firestore.collection('users').doc(user.uid);
        return userRef.collection('favorites').doc(movieId.toString()).delete();
      }
      return Promise.reject('User not authenticated');
    });
  }

  getFavoriteMovies() {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userRef = this.firestore.collection('users').doc(user.uid);
        return userRef.collection('favorites').valueChanges();
      }
      return null;
    });
  }

}
