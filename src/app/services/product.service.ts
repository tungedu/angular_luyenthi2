import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}
  api = 'http://localhost:3000/products';
  http = inject(HttpClient);

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }
  updateProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }
}
