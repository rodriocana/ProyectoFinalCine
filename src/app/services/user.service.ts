import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  loginUser(correo: string, contrasena: string): Observable<any> {
    return new Observable(observer => {
      this.auth.signInWithEmailAndPassword(correo, contrasena)
        .then(userCredential => {
          const userId = userCredential.user?.uid;
          console.log("User ID:", userId); // Verificar que el ID de usuario se obtenga

          if (userId) {
            const userDocRef = this.firestore.collection('Usuarios').doc(userId);
            userDocRef.get().pipe(
              map(userDoc => {
                if (userDoc.exists) {
                  return userDoc.data();
                } else {
                  console.warn("No se encontraron datos para el usuario con ID:", userId);
                  return null;
                }
              }),
              catchError(error => {
                console.error("Error al obtener el documento del usuario:", error);
                return of(null);
              })
            ).subscribe(data => {
              observer.next(data);
              observer.complete();
            });
          } else {
            observer.next(null);
            observer.complete();
          }
        })
        .catch(error => {
          console.error("Error al iniciar sesión:", error);
          observer.error(error);
        });
    });
  }
}
