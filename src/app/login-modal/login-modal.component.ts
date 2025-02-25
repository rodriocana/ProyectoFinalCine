<<<<<<< HEAD
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { user } from '@angular/fire/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [MessageService]
})
export class LoginModalComponent implements OnInit {

  isLogin: boolean = true;  // este true en el formulario es el que hace que salga form de inicio de sesion.
  @Output() close = new EventEmitter<void>();
  registroForm: FormGroup;
  inicioForm: FormGroup;
  selectedAvatar: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
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
      email: ['admin@gmail.com', Validators.required],
      password: ['admin1234', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal() {
    this.close.emit();

  }



  onSubmit() {
    if (this.inicioForm.valid) {
      this.userService.loginUser(this.inicioForm.value).subscribe({
        next: () => {
          this.messageService.add({severity: 'success',summary: 'Inicio de sesión exitoso',detail: 'Bienvenido a la plataforma.',life: 5000 });
        },
        error: (error: any) => {
          // Mostrar mensaje de error en el toast
          this.messageService.add({severity: 'error',summary: 'Error',detail: 'Falló el inicio de sesión. Verifica tus credenciales.',life: 5000});
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
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Operación completada', life:5000 });
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
=======
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { user } from '@angular/fire/auth';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [MessageService]
})
export class LoginModalComponent implements OnInit {

  isLogin: boolean = true;  // este true en el formulario es el que hace que salga form de inicio de sesion.
  @Output() close = new EventEmitter<void>();
  registroForm: FormGroup;
  inicioForm: FormGroup;
  selectedAvatar: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
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
      email: ['admin@gmail.com', Validators.required],
      password: ['admin1234', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeModal() {
    this.close.emit();

  }



  onSubmit() {
    if (this.inicioForm.valid) {
      this.userService.loginUser(this.inicioForm.value).subscribe({
        next: () => {
          this.messageService.add({severity: 'success',summary: 'Inicio de sesión exitoso',detail: 'Bienvenido a la plataforma.',life: 5000 });
        },
        error: (error: any) => {
          // Mostrar mensaje de error en el toast
          this.messageService.add({severity: 'error',summary: 'Error',detail: 'Falló el inicio de sesión. Verifica tus credenciales.',life: 5000});
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
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Operación completada', life:5000 });
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
>>>>>>> 82394f3 (Subiendo el código del proyecto)
