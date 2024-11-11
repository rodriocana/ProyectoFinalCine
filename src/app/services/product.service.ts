import { Injectable } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Producto {
  id?: string;
  nombreProducto: string;
  precioProducto: number;
  imgProducto: string;
  categoriaProducto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Esta variable ya es un Observable<Producto[]> y no necesitamos hacer cast.
  private productosCollection: Observable<Producto[]>;

  constructor(private firestore: Firestore) {
    // Referencia a la colección 'productos' en Firestore
    const productosRef = collection(this.firestore, "Producto");

    // Crear una consulta ordenando por 'nombreProducto'
    const consulta = query(productosRef, orderBy('nombreProducto', 'asc'));

    // Obtener los datos de los productos y almacenarlos en la variable 'productosCollection'
    this.productosCollection = collectionData(consulta, { idField: 'id' });
  }

  // Obtiene todos los productos
  getProductos(): Observable<Producto[]> {
    return this.productosCollection; // Retorna directamente el observable de productos
  }
}
