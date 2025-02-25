import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// User Service para comprobar usuarios en firebase Authentication.
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

  // en este login, comprobamos si existe el correo y contraseña de firebase authenticator, y si existe, nos logueamos con ese usuario.
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

  // aqui creamos el usuario en la base de datos FIREBASE authentication, además de guardarlos en la coleccion Usuarios.
  registerUser(form: any): Observable<any> {
    return new Observable(observer => {
      this.auth.createUserWithEmailAndPassword(form.correo, form.contrasena) // aqui se crea en authentication.
        .then(userCredential => {
          const userId = userCredential.user?.uid;
          if (userId) {
            // Guardar información adicional del usuario en Firestore coleccion Usuarios.
            this.firestore.collection('Usuarios').doc(userId).set({
              nombre: form.nombre,
              correo: form.correo,
              saldo: form.saldo,
              avatar: form.avatar
            })
            .then(() => {
              // Crear la subcolección 'favoritos' inicializándola con un documento vacío
              this.firestore.collection('Usuarios').doc(userId)
                .collection('favoritos').doc('_placeholder').set({})
                .then(() => {
                  console.log('Subcolección favoritos creada exitosamente.');
                })
                .catch(error => {
                  console.error('Error al crear la subcolección favoritos:', error);
                });
            })
            .catch(error => {
              console.error('Error al guardar información del usuario:', error);
            });
            this.authStatus.next(true);  // Emitir `true` al registrarse exitosamente
          }
        });
    });
  }

}
