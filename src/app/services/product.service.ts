import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';


interface Producto {
  id?: string;
  nombreProducto: string;
  precioProducto: number;
  imgProducto: string;
  categoriaProducto:string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productosCollection: AngularFirestoreCollection<Producto>;

  constructor(private firestore: AngularFirestore) {
    // Accede a la colección "producto"
    this.productosCollection = this.firestore.collection<Producto>('Producto');
  }

  // Obtiene todos los productos
  getProductos(): Observable<Producto[]> {
    return this.productosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
