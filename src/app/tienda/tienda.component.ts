import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth-service.service';
import { Producto } from '../interfaces/producto.model';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productosEnCesta: any[] = []; // Arreglo para almacenar los productos añadidos a la cesta
  filtroCategoria: string = '';
  filtroPrecioMin: number | null = null;
  filtroPrecioMax: number | null = null;
  isCestaVisible: boolean = false; // Propiedad para controlar la visibilidad de la cesta
  user: any;
  token = '';


  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.messageService.add({ severity: 'info', summary: '', detail: 'Bienvenido a la tienda', life: 1500 });

    if (!this.token) {
      alert("Para acceder a la tienda debes estar logueado");
    } else {
      this.productService.getProductos().subscribe({
        next: (productos) => {
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
      //   },
      //   error: (err) => {
      //     console.error('Error al obtener productos', err);
      //   },
      // });
    // }
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
}
