import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  authService = inject(AuthService);
  router = inject(Router);

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      alert('Vui long nhap day du thong tin');
      return;
    }
    this.authService.loginUser(this.loginForm.value).subscribe((res) => {
      alert('Dang nhap thanh cong');
      sessionStorage.setItem('token', res.token);
      this.router.navigate(['/admin/products']);
    });
  }
}
