import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';
  @Input() isLogin: boolean = true;  // este true en el formulario es el que hace que salga form de inicio de sesion.
  @Output() close = new EventEmitter<void>();
  registroForm: FormGroup;
  inicioForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // Inicializa el FormGroup
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      saldo: ['', Validators.required],
    });

    this.inicioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.inicioForm.valid) {
      this.userService.loginUser(this.inicioForm.value).subscribe({
        next: (userData: any) => {
        },
        error: (error: any) => {

        },
      });
    }
  }

  // onSubmit() {
  //   if (this.inicioForm.valid) {
  //     this.userService.loginUser(this.inicioForm.value).subscribe({
  //       next: (userData: any) => {
  //         if (userData) {
  //           alert(
  //             `¡Has iniciado sesión correctamente! \n Datos del usuario: ${JSON.stringify(
  //               userData
  //             )}`

  //           );
  //         } else {
  //           alert('No se encontraron datos para este usuario.');
  //         }

  //         console.log("hola" + JSON.stringify(userData));

  //         this.closeModal(); // Cierra el modal
  //       },
  //       error: (error: any) => {
  //         console.error('Error en onSubmit:', error);
  //         alert('Error: Usuario o contraseña incorrectos');
  //       },
  //     });
  //   }
  // }

  onRegister() {
    if (this.registroForm.valid) {
      this.userService.registerUser(this.registroForm.value).subscribe({
        next: (userData: any) => {
          if (userData) {
            alert(
              `¡Has registrado sesión correctamente! \n Datos del usuario: ${JSON.stringify(
                userData
              )}`
            );
          } else {
            alert('No se encontraron datos para este usuario.');
          }
          this.closeModal(); // Cierra el modal
        },
        error: (error: any) => {
          console.error('Error en onSubmit:', error);
          alert('Error: Usuario o contraseña incorrectos');
        },
      });
    }
  }
}
