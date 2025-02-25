
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

   // Creamos un BehaviorSubject para almacenar el estado del sidebar (abierto o cerrado)
   private sidebarState = new BehaviorSubject<boolean>(false);  // false: cerrado, true: abierto

   constructor() { }

   // Método para obtener el estado actual del sidebar como un Observable
   getSidebarState() {
     return this.sidebarState.asObservable();
   }

   // Método para cambiar el estado del sidebar
   toggleSidebar() {
     this.sidebarState.next(!this.sidebarState.value);
   }

   // Método para abrir el sidebar
   openSidebar() {
     this.sidebarState.next(true);
   }

   // Método para cerrar el sidebar
   closeSidebar() {
     this.sidebarState.next(false);
   }
}

