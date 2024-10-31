import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';

  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private userService: UserService) {}

  closeModal() {
    this.close.emit();
  }

  async onSubmit() {
    try {
      const userData = await this.userService.loginUser(this.username, this.password);
      if (userData) {
        alert(`¡Has iniciado sesión correctamente! \n Datos del usuario: ${JSON.stringify(userData)}`);
      } else {
        alert('No se encontraron datos para este usuario.');
      }
      this.closeModal(); // Cierra el modal
    } catch (error) {
      console.error("Error en onSubmit:", error);
      alert('Error: Usuario o contraseña incorrectos');
    }
  }

  onRegister() {
    this.router.navigate(['registro']);
  }
}
