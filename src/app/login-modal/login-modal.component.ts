import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';
  @Input() isLogin: boolean = true;
  @Output() close = new EventEmitter<void>();
  registroForm: FormGroup;

  constructor(private router: Router, private userService: UserService,
    private fb: FormBuilder
  ) {
        // Inicializa el FormGroup
        this.registroForm = this.fb.group({
          nombre: ['', Validators.required],
          correo: ['', [Validators.required, Validators.email]],
          contrasena: ['', Validators.required],
          saldo: ['', Validators.required],
        });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.userService.loginUser(this.username, this.password).subscribe(
      (userData: any) => {
        if (userData) {
          alert(`¡Has iniciado sesión correctamente! \n Datos del usuario: ${JSON.stringify(userData)}`);
        } else {
          alert('No se encontraron datos para este usuario.');
        }
        this.closeModal(); // Cierra el modal
      },
      (error: any) => {
        console.error("Error en onSubmit:", error);
        alert('Error: Usuario o contraseña incorrectos');
      }
    );
  }

  onRegister() {
    if (this.registroForm.valid) {
      this.userService.registerUser(this.registroForm.value).subscribe(
        (userData: any) => {
          if (userData) {
            alert(`¡Te has registrado correctamente! \n Datos del usuario: ${JSON.stringify(userData)}`);
            this.closeModal(); // Cierra el modal solo después de un registro exitoso
          } else {
            alert('No se encontraron datos para este usuario.');
          }
        },
        (error: any) => {
          console.error("Error en onRegister:", error);
          alert('Error: No se pudo registrar al usuario. Verifica los datos ingresados.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
