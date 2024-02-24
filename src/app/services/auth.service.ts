import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  api = 'http://localhost:8000/auth';
  http = inject(HttpClient);

  registerUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.api}/register`, user);
  }
  loginUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.api}/login`, user);
  }
}
