import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080'; // Dirección base de tu API

  constructor(private http: HttpClient) { }

  // Método para agregar un producto
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, product);
  }

  // Método para obtener el último producto agregado
  getLastAddedProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/isNewProductAdded`);
  }

  // Método para contar productos con descuento (Long Polling)
  countProductsInDiscount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countProductInDiscount`);
  }
}
