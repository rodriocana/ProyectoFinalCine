export interface Producto {
  id?: string; // Opcional
  imgProducto: string;
  nombreProducto: string;
  precioProducto: number;
  categoriaProducto: string;
  [key: string]: any; // Campos adicionales, si los hay
}
