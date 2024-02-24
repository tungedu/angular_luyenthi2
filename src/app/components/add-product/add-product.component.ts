import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  productService = inject(ProductService);
  router = inject(Router);
  isError: boolean = false;

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.createForm.invalid) {
      this.isError = true;
      alert('Vui long nhap day du thong tin');
      return;
    }
    this.productService.addProduct(this.createForm.value).subscribe(() => {
      alert('Them moi thanh cong');
      this.router.navigate(['/admin/products']);
    });
  }
}
