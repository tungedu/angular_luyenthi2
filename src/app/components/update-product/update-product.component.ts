import { Component, ElementRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../types/Product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  editProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    quantity: 0,
    description: '',
  };

  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  idProduct = 0;

  getEditProduct(id: number) {
    this.productService.getProductDetail(id).subscribe((res) => {
      this.editProduct = res;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.idProduct = res['id'];
      if (this.idProduct) {
        this.getEditProduct(this.idProduct);
      }
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log(this.editProduct);
    if (this.updateForm.invalid) {
      alert('Vui long nhap day du thong tin');
      return;
    }
    this.productService
      .updateProduct(this.editProduct, this.idProduct)
      .subscribe(() => {
        alert('Update thanh cong');
        this.router.navigate(['/admin/products']);
      });
  }
}
