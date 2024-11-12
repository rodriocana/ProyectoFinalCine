import { Component } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore'; // Actualizado
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Actualizado
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
  avatarSeleccionado: string | null = null; // Propiedad para almacenar la ruta del avatar

  constructor(private auth: AngularFireAuth, private firestore: Firestore) {}

  // Método para seleccionar el avatar
  seleccionarAvatar(avatar: string) {
    this.avatarSeleccionado = avatar;
  }

  async onRegister() {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(this.correo, this.contrasena); // Actualizado
      const userId = userCredential.user?.uid;

      if (userId) {
        const userDocRef = doc(this.firestore, 'usuarios', userId); // Obtiene la referencia al documento del usuario
        await setDoc(userDocRef, { // Usando setDoc para establecer los datos
          idsocio: userId,
          nombre: this.nombre,
          contrasena: this.contrasena,
          correo: this.correo,
          saldo: this.saldo,
          avatar: this.avatarSeleccionado, // Guardamos la ruta del avatar
        });
        console.log("Usuario registrado correctamente.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  }
}
