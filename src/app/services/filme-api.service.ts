import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FilmesPaginados, FilmeCreateDTO, Filme } from '../models/filme.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmeApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() {}

  // LISTAR FILMES (admin)  ---------------------------------
  async getFilmes(
    page: number,
    limit: number,
    titulo?: string
  ): Promise<FilmesPaginados> {
    const url = `${this.apiUrl}/api/v1/filmes`;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (titulo) {
      params = params.set('titulo', titulo);
    }

    const token = localStorage.getItem('app-token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    // pega a resposta crua do backend (com ID, Titulo, etc.)
    const raw = await firstValueFrom(
      this.http.get<any>(url, { params, headers })
    );

    const data: Filme[] = (raw.data ?? raw).map((f: any) => ({
      id: f.ID,
      titulo: f.Titulo,
      sinopse: f.Sinopse,
      anoLancamento: f.AnoLancamento,
      posterUrl: f.PosterUrl,
      fraseEfeito: f.FraseEfeito ?? '',
    }));

    const total: number = raw.total ?? data.length;

    return { data, total };
  }

  // CRIAR FILME ---------------------------------------------
  async criarFilme(filmeData: FilmeCreateDTO): Promise<Filme> {
    const url = `${this.apiUrl}/api/v1/filmes`;

    const token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return await firstValueFrom(
      this.http.post<Filme>(url, filmeData, { headers })
    );
  }

  // DELETAR FILME -------------------------------------------
  async deletarFilme(id: number): Promise<void> {
    const url = `${this.apiUrl}/api/v1/filmes/${id}`;

    const token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    await firstValueFrom(this.http.delete(url, { headers }));
  }

  // ATUALIZAR FILME -----------------------------------------
  async atualizarFilme(id: number, filmeData: FilmeCreateDTO): Promise<Filme> {
    const url = `${this.apiUrl}/api/v1/filmes/${id}`;

    const token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return await firstValueFrom(
      this.http.put<Filme>(url, filmeData, { headers })
    );
  }

  // DETALHES (pode continuar na rota pública se você quiser usar depois)
  async getDetalhesFilme(id: number): Promise<any> {
    const url = `${this.apiUrl}/api/v1/filmes/${id}`;

    return await firstValueFrom(this.http.get<any>(url));
  }
}
