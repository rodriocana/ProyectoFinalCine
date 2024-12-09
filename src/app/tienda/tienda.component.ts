import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth-service.service';
import { Producto } from '../interfaces/producto.model';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.model';



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {

  user$: Observable<any> | undefined;
  saldoUser: number;
  userId:string;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productosEnCesta: any[] = []; // Arreglo para almacenar los productos añadidos a la cesta
  filtroCategoria: string = '';
  filtroPrecioMin: number | null = null;
  filtroPrecioMax: number | null = null;
  isCestaVisible: boolean = false; // Propiedad para controlar la visibilidad de la cesta
  user: any;
  token = '';
  users: Usuario[] = []; // Lista de usuarios



  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private messageService: MessageService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private auth:AuthService
  ) { }


  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.messageService.add({ severity: 'info', summary: '', detail: 'Bienvenido a la tienda', life: 1500 });

    if (!this.token) {
      alert("Para acceder a la tienda debes estar logueado");
    } else {
      this.productService.getProductos().subscribe({
        next: (productos) => {
          console.log(productos)
          this.productos = productos; // Asigna los productos al array 'productos'
          this.productosFiltrados = productos; // Inicialmente muestra todos
        },
        error: (err) => {
          console.error('Error al obtener productos', err);
        },
      });

      // ----- aqui llamo a los productos de la base de datos sql ---- //
      // this.productService.getProductosSql().subscribe({
      //   next: (productos) => {
      //     console.log('Productos recibidos de sql:', productos); // Verifica la estructura de los datos

      //     this.productos = productos; // ----- Asignar los productos al array 'productos' ----
      //     this.productosFiltrados = productos; //  --- muestro todos inicialmente

      //     console.log("hola" + this.productosFiltrados);
      //     console.log("adios" + this.productos);

      //   },
      //   error: (err) => {
      //     console.error('Error al obtener productos', err);
      //   },
      // });

      this.user$ = this.afAuth.authState;
      this.user$.subscribe(user => {
        if (user) {
          this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe({
            next: (resp:any) => {
              if (resp) {
                this.saldoUser = resp.saldo;
                this.userId = user.uid
               }
            },
            error: error => {
            },
          });

        } else {
          console.log("No hay usuario autenticado");

        }
      });
  }

  }

  filtrarProductos(): void {
    this.productosFiltrados = this.productos.filter((producto) => {
      const cumpleCategoria = this.filtroCategoria
        ? producto['categoriaProducto'] === this.filtroCategoria
        : true;
      const cumplePrecioMin =
        this.filtroPrecioMin !== null
          ? producto.precioProducto >= this.filtroPrecioMin
          : true;
      const cumplePrecioMax =
        this.filtroPrecioMax !== null
          ? producto.precioProducto <= this.filtroPrecioMax
          : true;

      return cumpleCategoria && cumplePrecioMin && cumplePrecioMax;
    });
  }

  ReiniciarFiltro() {
    this.filtroCategoria = '';
    this.filtroPrecioMin = null;
    this.filtroPrecioMax = null;
    this.filtrarProductos();
  }

  agregarACesta(producto: any): void {
    this.productosEnCesta.push(producto);
    alert(`${producto.nombreProducto} añadido a la cesta`);
  }

  toggleCesta(): void {
    this.isCestaVisible = !this.isCestaVisible; // Cambia la visibilidad de la cesta
  }

  eliminarDeCesta(producto: any): void {
    const index = this.productosEnCesta.indexOf(producto);
    if (index > -1) {
      this.productosEnCesta.splice(index, 1); // Elimina el producto de la cesta
      alert(`${producto.nombreProducto} eliminado de la cesta`);
    }
  }

  getTotalCesta(): number {
    return this.productosEnCesta.reduce(
      (total, producto) => total + producto.precioProducto,
      0
    );
  }

  ComprarProdCesta(userId: string): void {

    const saldoTotalCesta = this.getTotalCesta(); // Calcula el total de la compra
    const saldoRestante = this.saldoUser - saldoTotalCesta; // Resta el total de la compra al saldo del usuario

    if (saldoRestante < 0) {
      alert('Saldo insuficiente para realizar la compra');
      return; // Si no hay suficiente saldo, se termina la función
    }

    console.log(`Saldo restante: ${saldoRestante}`);

    this.updateUserSaldo(userId, saldoRestante);

    this.isCestaVisible = !this.isCestaVisible;
  }

    updateUserSaldo(userId: string, nuevoSaldo: number): void {
      this.firestore.collection('Usuarios').doc(userId).update({ saldo: nuevoSaldo })
        .then(() => {
          alert('Saldo actualizado correctamente');
          this.loadUsers();
        })
        .catch((error) => {
          console.error('Error al actualizar el saldo del usuario:', error);
        });
    }

    // para volver a cargar el usuario actualizado de firebase
    loadUsers(): void {
      this.firestore.collection<Usuario>('Usuarios').snapshotChanges().subscribe({
        next: (changes) => {
          this.users = changes.map((change) => {
            const data = change.payload.doc.data() as Usuario;
            const id = change.payload.doc.id;
            return { id, ...data };
          });
          console.log('Usuarios cargados:', this.users);
        },
        error: (error) => {
          console.error('Error al cargar usuarios:', error);
        }
      });
    }
}
