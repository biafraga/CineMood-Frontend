import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private router = inject(Router);

  constructor() { }

  async login (request: LoginRequest): Promise <string> {
    const url = `${this.apiUrl}/api/v1/admin/login`;
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(url, request)
    );

    localStorage.setItem('token', response.token);

    if (response.token) {
      localStorage.setItem('app-token', response.token);
    }

    return response.token;
  }

  logout(): void {
    try {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    } finally {
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
  }
}
