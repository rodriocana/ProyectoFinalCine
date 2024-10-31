import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  async loginUser(correo: string, contrasena: string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(correo, contrasena);
      const userId = userCredential.user?.uid;

      if (userId) {
        const userDocRef = this.firestore.collection('Usuarios').doc(userId);
        const userDoc = await userDocRef.get().toPromise(); // Convertir el observable en promesa

        return userDoc?.exists ? userDoc.data() : null;
      } else {
        return null; // Si userId es undefined
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }
}
