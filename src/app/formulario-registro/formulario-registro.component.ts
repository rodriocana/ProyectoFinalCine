import { Component } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore'; // Actualizado
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth'; // Actualizado
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  saldo: number | null = null; // Cambié el tipo a number | null

  constructor(private auth: Auth, private firestore: Firestore) {}

  async onRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.correo, this.contrasena); // Actualizado
      const userId = userCredential.user?.uid;

      if (userId) {
        const userDocRef = doc(this.firestore, 'usuarios', userId); // Obtiene la referencia al documento del usuario
        await setDoc(userDocRef, { // Usando setDoc para establecer los datos
          idsocio: userId,
          nombre: this.nombre,
          contrasena: this.contrasena,
          correo: this.correo,
          saldo: this.saldo,
        });
        console.log("Usuario registrado correctamente.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  }
}
