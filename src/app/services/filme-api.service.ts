import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilmesPaginados } from '../models/filme.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  // Busca uma lista paginada de filmes da API (Rota: GET /api/v1/filmes)
  async getFilmes (page: number, limit: number): Promise<FilmesPaginados> {
    const url = `${this.apiUrl}/api/v1/filmes`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const response = await firstValueFrom (
      this.http.get<FilmesPaginados>(url, {params})
    );

    return response;
  }
}
