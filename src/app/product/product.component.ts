import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [FormsModule,NgFor],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product = {
    nombre: '',
    precio: 0,
    codigo: '',
    descuento: false
  };

  temporaryProducts: any[] = []; // Arreglo para productos temporales
  discountCount: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getTemporaryProducts();
    this.getDiscountProductCount();
  }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      response => {
        console.log('Producto agregado:', response);
        this.product = { nombre: '', precio: 0, codigo: '', descuento: false }; // Limpiar formulario
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  getTemporaryProducts(): void {
    setInterval(() => {
      this.productService.getTemporaryProducts().subscribe(
        (products) => {
          if (Array.isArray(products)) { // Valida que sea un array
            this.temporaryProducts = products;
          } else {
            console.error('La respuesta no es un array:', products);
            this.temporaryProducts = []; // Vacía la lista en caso de error
          }
        },
        (error) => {
          console.error('Error al obtener productos temporales:', error);
        }
      );
    }, 5000);
  }
  
  getDiscountProductCount(): void {
    this.productService.countProductsInDiscount().subscribe({
      next: (data) => {
        console.log('Flujo recibido:', data);
        try {
          const parsedData = JSON.parse(data);
          console.log('Datos procesados:', parsedData);
          this.discountCount = parsedData.productos_con_descuento; // Actualizamos la vista
        } catch (error) {
          console.error('No se pudo parsear la respuesta:', error);
        }
      },
      error: (error) => {
        console.error('Error en la conexión Long Polling:', error);
      }
    });
  }
}
