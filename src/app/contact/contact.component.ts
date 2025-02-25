<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formulario: FormGroup;

  user$: Observable<any> | undefined;
  userName: string | null = null; // Para almacenar el nombre del usuario
  emailUser:string | null = null;

  constructor(private formBuilder: FormBuilder,private formularioService: FormularioService, private router:Router , private messageService: MessageService,
    private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit(): void {

    this.messageService.add({ severity: 'info', summary: '', detail: 'Formulario de contacto', life: 1500 });

    this.formulario = this.formBuilder.group({
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],  // Validador de email
      telefono: ["", [Validators.required, Validators.pattern('[0-9]{9}')]],
      mensaje: ["", Validators.required]  // Campo de mensaje obligatorio
    });

    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe({
          next: (resp:any) => {
            if (resp) {
              this.userName = resp.nombre;
              this.emailUser = resp.correo;
               // Actualizar dinámicamente los valores del formulario para mostrar el nombre y email del usuario en cuestión
              this.formulario.patchValue({nombre: this.userName, email: this.emailUser});
             // Deshabilita el campo de email
              this.formulario.get('email')?.disable();
              this.formulario.get('nombre')?.disable();
             }
          },
          error: error => {
          },
        });


      } else {
        console.log("No hay usuario autenticado");
        this.userName = null; // Resetea el nombre si no hay usuario
      }
    });
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      this.formularioService.enviarFormulario(formData).subscribe(
        () => {
          console.log("Formulario enviado correctamente");
          this.formulario.reset(); // Resetea el formulario después de enviar
        },
        (error) => {
          console.error("Error al enviar formulario", error);
        }
      );
    } else {
      console.log("Formulario no válido");
    }
  }

  volverMenu() {
    this.router.navigate(["/movieList"]);
    }
}
=======
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../services/formulario.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formulario: FormGroup;

  user$: Observable<any> | undefined;
  userName: string | null = null; // Para almacenar el nombre del usuario
  emailUser:string | null = null;

  constructor(private formBuilder: FormBuilder,private formularioService: FormularioService, private router:Router , private messageService: MessageService,
    private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit(): void {

    this.messageService.add({ severity: 'info', summary: '', detail: 'Formulario de contacto', life: 1500 });

    this.formulario = this.formBuilder.group({
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],  // Validador de email
      telefono: ["", [Validators.required, Validators.pattern('[0-9]{9}')]],
      mensaje: ["", Validators.required]  // Campo de mensaje obligatorio
    });

    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if (user) {
        this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe({
          next: (resp:any) => {
            if (resp) {
              this.userName = resp.nombre;
              this.emailUser = resp.correo;
               // Actualizar dinámicamente los valores del formulario para mostrar el nombre y email del usuario en cuestión
              this.formulario.patchValue({nombre: this.userName, email: this.emailUser});
             // Deshabilita el campo de email
              this.formulario.get('email')?.disable();
              this.formulario.get('nombre')?.disable();
             }
          },
          error: error => {
          },
        });


      } else {
        console.log("No hay usuario autenticado");
        this.userName = null; // Resetea el nombre si no hay usuario
      }
    });
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      this.formularioService.enviarFormulario(formData).subscribe(
        () => {
          console.log("Formulario enviado correctamente");
          this.formulario.reset(); // Resetea el formulario después de enviar
        },
        (error) => {
          console.error("Error al enviar formulario", error);
        }
      );
    } else {
      console.log("Formulario no válido");
    }
  }

  volverMenu() {
    this.router.navigate(["/movieList"]);
    }
}
>>>>>>> 82394f3 (Subiendo el código del proyecto)
