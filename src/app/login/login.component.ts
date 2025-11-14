import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/auth.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false); // Sinal de loading
  error = signal<string | null>(null); // Sinal de erro

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]] 
  });

  async onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const { email, senha } = this.form.getRawValue();
      if (email == null || senha == null) {
        this.error.set('Email e Senha são obrigatórios');
        this.loading.set(false);
        return;
      }
      await this.authService.login({ email, senha });
      this.router.navigate(['/lista-usuario']);
    } catch (err: any) {
      this.error.set(err.message || 'Erro ao realizar login');
    } finally {
      this.loading.set(false);
    }
  }
  get redirecionaCadastro() {
    this.router.navigate(['/formulario']);
    return true;
  }
}
