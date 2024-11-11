import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
    // Escuchar cambios en el estado de autenticación de Firebase
    this.auth.authState.subscribe((user) => {
      this.authStatus.next(!!user);  // Emitir `true` si el usuario está autenticado, `false` si no
    });
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  loginUser(form: any): Observable<any> {
    return new Observable(observer => {
      this.auth.signInWithEmailAndPassword(form.email, form.password)
        .then(userCredential => {
          this.authStatus.next(true);  // Emitir `true` al iniciar sesión exitosamente
          observer.next(userCredential);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  registerUser(form: any): Observable<any> {
    return new Observable(observer => {
      this.auth.createUserWithEmailAndPassword(form.correo, form.contrasena)
        .then(userCredential => {
          const userId = userCredential.user?.uid;
          if (userId) {
            // Guardar información adicional del usuario en Firestore
            this.firestore.collection('Usuarios').doc(userId).set({
              nombre: form.nombre,
              correo: form.correo,
              saldo: form.saldo,
            });
            this.authStatus.next(true);  // Emitir `true` al registrarse exitosamente
          }
          observer.next(userCredential);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
