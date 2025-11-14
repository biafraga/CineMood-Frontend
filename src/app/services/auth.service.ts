import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  async login (request: LoginRequest): Promise <string> {
    const url= `${this.apiUrl}/auth/login`;
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(url, request)
    )

    if (response.token) {
      localStorage.setItem('app-token', response.token);
    }

    return response.token;
  }
}
