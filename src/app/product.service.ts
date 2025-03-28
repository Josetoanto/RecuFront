import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, product);
  }

  getTemporaryProducts(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.apiUrl}/getTemporaryProducts`);
  }
  
  countProductsInDiscount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countProductInDiscount`, { responseType: 'text', observe: 'body' });
  }
}
