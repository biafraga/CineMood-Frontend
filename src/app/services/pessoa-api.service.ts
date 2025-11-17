import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PessoasPaginadas } from '../models/pessoa.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  // Busca uma lista paginada de filmes da API (Rota: GET /api/v1/filmes)
  async getPessoas(page: number, limit: number): Promise<PessoasPaginadas> {
    const url = `${this.apiUrl}/api/v1/pessoas`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const response = await firstValueFrom(
      this.http.get<PessoasPaginadas>(url, { params })
    );
    return response;
  }
}
