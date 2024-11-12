import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {

  @Input() isLogin: boolean = true;  // este true en el formulario es el que hace que salga form de inicio de sesion.
  @Output() close = new EventEmitter<void>();
  registroForm: FormGroup;
  inicioForm: FormGroup;
  selectedAvatar: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      saldo: ['', Validators.required],
      avatar: [this.selectedAvatar]  // Agrega el campo del avatar
    });

    this.inicioForm = this.fb.group({
      email: ['rodrogo92@gmail.com', Validators.required],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal() {
    this.close.emit();
  }


  onSubmit() {
    if (this.inicioForm.valid) {
      this.userService.loginUser(this.inicioForm.value).subscribe({
        next: () => {
          location.reload();
        },
        error: (error: any) => {
          // Manejo de errores
        },
      });
    }
  }

  setAvatar(avatarPath: string) {
    this.registroForm.value.avatar = avatarPath;
  }


  onRegister() {
    if (this.registroForm.valid) {
      // Incluye la ruta del avatar al pasar el formulario
      this.userService.registerUser(this.registroForm.value).subscribe({
        next: (userData: any) => {
          if (userData) {
            alert(`¡Has registrado sesión correctamente! \n Datos del usuario: ${JSON.stringify(userData)}`);
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
