import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  authService = inject(AuthService);
  router = inject(Router);

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      alert('Vui long nhap day du thong tin');
      return;
    }
    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      alert('Dang ky thanh cong');
      this.router.navigate(['/login']);
    });
  }
}
