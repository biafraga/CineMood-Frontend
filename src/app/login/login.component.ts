import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    login: ['', [Validators.required]],
    senha: ['', [Validators.required]]
  });

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      const { login, senha } = this.form.getRawValue();
      if (login == null || senha == null) {
        this.error.set('Login e Senha são obrigatórios');
        return;
      }
      await this.authService.login({ login, senha });
      this.router.navigate(['/admin']);
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
