import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { Usuario } from '../interfaces/usuario.model';
import { Producto } from '../interfaces/producto.model';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: Observable<any> | undefined;
  userName: string | null = null;
  userEmail: string | null = null;
  avatar: string | null = null;
  userSaldo: number | null = null;
  isAdmin: boolean = false; // Nueva propiedad para controlar si el usuario es admin
  showManageUsersModal = false; // Controlar la visibilidad del modal
  users: Usuario[] = []; // Lista de usuarios
  productos: Producto[] = [];
  showManageShopModal = false;
  showAddProductModal = false; // Nueva propiedad para controlar la visibilidad del modal de añadir producto
  selectedProduct: Producto | null = null;
  productForm: FormGroup; // Define el formulario reactivo
  isEditMode: boolean = false; // Determina si estamos en modo edición o adición



  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router, private authService: AuthService,
    private productService: ProductService, private fb: FormBuilder, private messageService: MessageService) {

    this.productForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      precioProducto: ['', [Validators.required, Validators.min(0)]],
      categoriaProducto: ['', Validators.required],
      imgProducto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.messageService.add({ severity: 'info', summary: '', detail: 'MI PERFIL', life: 1500 });

    this.user$ = this.afAuth.authState;
    // Suscripción al estado de autenticación
    this.user$.subscribe(user => {
      if (user) {
        console.log('Usuario autenticado:', user);

        // Obtener datos adicionales desde Firestore del usuario logueado en cuestión.
        this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe({
          next: (resp: any) => {
            if (resp) {
              this.userName = resp.nombre;
              this.avatar = resp.avatar;
              this.userEmail = user.email;
              this.userSaldo = resp.saldo;

              // Verificar si el usuario es admin
              this.isAdmin = resp.nombre === 'admin';
            }
          },
          error: error => {
            console.error('Error al cargar los datos del usuario:', error);
          }
        });

        // Guardar el token de sesión
        localStorage.setItem('token', user.refreshToken);
      } else {
        console.log('No hay usuario autenticado');
        this.resetProfile();
      }
    });

    if (this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct);
    }
  }

  private resetProfile(): void {
    this.userName = null;
    this.userEmail = null;
    this.avatar = null;
    this.isAdmin = false; // Reiniciar isAdmin al cerrar sesión
  }

  goToHome(): void {
    this.router.navigate(['/movieList']);
  }

  // Métodos para las acciones de administrador
  manageUsers(): void {
    this.showManageUsersModal = true; // Mostrar el modal
    this.loadUsers(); // Cargar la lista de usuarios desde Firestore
  }
  ManageShop(): void {
    console.log('Gestionar tienda');
    this.openManageShopModal();
  }

  // Cargar usuarios desde Firestore
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

  // Eliminar usuario
  deleteUser(userId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.firestore.collection('Usuarios').doc(userId).delete().then(() => {
        alert('Usuario eliminado correctamente');
        this.loadUsers(); // Actualizar la lista
      }).catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
    }
  }

  // Cerrar modal
  closeManageUsersModal(): void {
    this.showManageUsersModal = false;
  }

  loadProducts(): void {
    this.productService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        console.log('Productos cargados:', this.productos);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
    });
  }

  // Añadir producto
  // Llamado cuando se añade un nuevo producto
  addNewProduct() {
    this.isEditMode = false;
    this.selectedProduct = null; // Reiniciar el producto seleccionado
    this.productForm.reset(); // Limpiar el formulario
    this.showAddProductModal = true;
  }

  editProduct(product: any) {
    this.isEditMode = true;
    this.selectedProduct = product;
    // Prellenar el formulario con los datos del producto
    this.productForm.patchValue({
      nombreProducto: product.nombreProducto,
      precioProducto: product.precioProducto,
      imgProducto: product.imgProducto,
      categoriaProducto: product.categoriaProducto
    });
    this.showAddProductModal = true;
  }

  // Guardar producto
  saveProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData: Producto = this.productForm.value;

    if (this.isEditMode && this.selectedProduct) {
      // Si estamos en modo edición, actualizamos el producto
      this.productService.updateProducto(this.selectedProduct.id, productData).then(() => {
        alert('Producto actualizado correctamente');
        this.loadProducts();  // Cargar los productos nuevamente
        this.closeAddProductModal();  // Cerrar el modal
      }).catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
    } else {
      // Si estamos en modo añadir, creamos un nuevo producto
      this.productService.addProducto(productData).then(() => {
        alert('Producto añadido correctamente');
        this.loadProducts();  // Cargar los productos nuevamente
        this.closeAddProductModal();  // Cerrar el modal
      }).catch(error => {
        console.error('Error al añadir el producto:', error);
      });
    }
  }

  // Eliminar producto
  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProducto(id).then(() => {
        alert('Producto eliminado correctamente');
        this.loadProducts();
      }).catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
    }
  }

  openManageShopModal(): void {
    this.loadProducts();
    this.showManageShopModal = true;
  }

  closeManageShopModal(): void {
    this.showManageShopModal = false;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.productForm.reset();
    this.selectedProduct = null;
  }
}
