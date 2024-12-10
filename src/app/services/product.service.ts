import { Injectable } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData, doc, updateDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



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

  private apiUrl = 'http://localhost:3000/producto';


  private productosCollection: Observable<Producto[]>;

  constructor(private firestore: Firestore, private http: HttpClient) {
    const productosRef = collection(this.firestore, "Producto");

    // para ordenar por nombreProducto
    const consulta = query(productosRef, orderBy('nombreProducto', 'asc'));

    // Obtener los datos de los productos y almacenarlos en la variable 'productosCollection'
    this.productosCollection = collectionData(consulta, { idField: 'id' });
  }

  // Obtiene todos los productos DE FIREBASE
  getProductos(): Observable<Producto[]> {
    return this.productosCollection; // Retorna directamente el observable de productos
  }

  // para acceder a los productos de SQL
  getProductosSql(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);  // Hace la solicitud GET al backend
  }



  updateProducto(id: string, data: Partial<Producto>): Promise<void> {
    const productRef = doc(this.firestore, `Producto/${id}`);
    return updateDoc(productRef, data);
  }

  deleteProducto(id: string): Promise<void> {
    const productRef = doc(this.firestore, `Producto/${id}`);
    return deleteDoc(productRef);
  }

  // Añade un nuevo producto
  addProducto(newProduct: Producto): Promise<void> {
    const productosRef = collection(this.firestore, "Producto");
    return addDoc(productosRef, newProduct)
      .then(() => {
        console.log('Producto añadido correctamente');
      })
      .catch((error) => {
        console.error('Error al añadir el producto:', error);
      });
  }
}

