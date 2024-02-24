import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/Product';
import { NgFor } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService);
  productList: Product[] = [];

  getProduct() {
    this.productService
      .getProductList()
      .subscribe((res) => (this.productList = res));
  }

  ngOnInit() {
    this.getProduct();
  }

  handleDelete(id: number) {
    const cf = confirm('Are you sure?');
    if (cf) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Xoa thanh cong');
        this.productList = this.productList.filter(
          (product) => product.id !== id
        );
      });
    }
    return;
  }
}
