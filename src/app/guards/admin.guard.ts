import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodeJwtPayload extends JwtPayload {
  _id: string;
}

export const adminGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    const decoded = jwtDecode(token) as DecodeJwtPayload;
    if (decoded._id == '65d952c93a6980153816d1d1') {
      return true;
    } else {
      alert('Ban khong du quyen vao trang admin');
    }
  }
  router.navigate(['/login']);
  return false;
};
