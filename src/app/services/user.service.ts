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

  loginUser(form:any): Observable<any> {
    return new Observable(observer => {
      this.auth.signInWithEmailAndPassword(form.username, form.password)
        .then(userCredential => {
          const userId = userCredential.user?.uid;
          console.log("User ID:", userId); // Verificar que el ID de usuario se obtenga
          })
    });
  }

  registerUser(form: any): Observable<any> {
    return new Observable(observer => {
      this.auth.createUserWithEmailAndPassword(form.correo, form.contrasena)
        .then(userCredential => {
          const userId = userCredential.user?.uid;
          console.log("User ID:", userId); // Verificar que el ID de usuario se obtenga
          if (userId) {
            // Guardar la información del usuario en Firestore
            this.firestore.collection('Usuarios').doc(userId).set({
              nombre: form.nombre, // Asegúrate de que el formulario tenga este campo
              correo: form.correo,
              saldo: form.saldo, // Asegúrate de que el formulario tenga este campo
              // Puedes agregar más campos aquí si es necesario
            })
          }
        })

    });
  }
}
