export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar:string;
  saldo?: number;
  [key: string]: any; // Opcional: si hay más campos dinámicos
}
