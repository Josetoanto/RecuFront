import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [FormsModule,NgIf],
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

  lastProduct: any = null;
  discountCount: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Iniciar el polling para obtener el último producto agregado
    this.getLastProduct();
    
    // Iniciar el long polling para contar los productos con descuento
    this.getDiscountProductCount();
  }

  // Método para agregar un producto
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

  // Método para obtener el último producto agregado
  getLastProduct(): void {
    setInterval(() => {
      this.productService.getLastAddedProduct().subscribe(
        (product) => {
          this.lastProduct = product;
        },
        (error) => {
          console.error('Error al obtener el último producto:', error);
        }
      );
    }, 5000); // Obtiene el último producto cada 5 segundos
  }

  // Método para obtener la cantidad de productos con descuento
  getDiscountProductCount(): void {
    setInterval(() => {
      this.productService.countProductsInDiscount().subscribe(
        (count) => {
          this.discountCount = count.productos_con_descuento;
        },
        (error) => {
          console.error('Error al obtener la cantidad de productos con descuento:', error);
        }
      );
    }, 5000); // Obtiene el conteo cada 5 segundos
  }
}
