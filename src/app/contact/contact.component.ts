import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../formulario.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,private formularioService: FormularioService, private router:Router , private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.add({ severity: 'info', summary: '', detail: 'Formulario de contacto', life: 1500 });

    this.formulario = this.formBuilder.group({
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],  // Validador de email
      telefono: ["", [Validators.required, Validators.pattern('[0-9]{9}')]],  // Teléfono de 10 dígitos
      mensaje: ["", Validators.required]  // Campo de mensaje obligatorio
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
