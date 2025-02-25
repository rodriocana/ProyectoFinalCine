<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private firestore: AngularFirestore) {}

  // Método para agregar un formulario a Firestore, usamos las variables como parametros para crear los campos en la base de datos.
  enviarFormulario(formData: { nombre: string, email: string, telefono: string, mensaje: string }): Observable<any> {
    // Usamos 'from' para convertir el Promise en Observable
    return from(this.firestore.collection('Formulario').add(formData));
  }
}
=======
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private firestore: AngularFirestore) {}

  // Método para agregar un formulario a Firestore, usamos las variables como parametros para crear los campos en la base de datos.
  enviarFormulario(formData: { nombre: string, email: string, telefono: string, mensaje: string }): Observable<any> {
    // Usamos 'from' para convertir el Promise en Observable
    return from(this.firestore.collection('Formulario').add(formData));
  }
}
>>>>>>> 82394f3 (Subiendo el código del proyecto)
