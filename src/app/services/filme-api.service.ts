import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FilmesPaginados, FilmeCreateDTO, Filme } from '../models/filme.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilmeApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private mapOne = (f: any): Filme => ({
    id: f?.id ?? f?.ID ?? 0,
    titulo: f?.titulo ?? f?.Titulo ?? '',
    sinopse: f?.sinopse ?? f?.Sinopse ?? '',
    anoLancamento: f?.anoLancamento ?? f?.AnoLancamento ?? null,
    posterUrl: f?.posterUrl ?? f?.PosterUrl ?? '',
    fraseEfeito: f?.fraseEfeito ?? f?.FraseEfeito ?? ''
  });

  async getFilmes(page: number, limit: number, titulo?: string): Promise<FilmesPaginados> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (titulo) params = params.set('titulo', titulo);

    const url = `${this.apiUrl}/api/v1/filmes`;
    const raw = await firstValueFrom(this.http.get<any>(url, { params }));

    const arr = raw?.data ?? raw?.items ?? raw ?? [];
    const data: Filme[] = Array.isArray(arr) ? arr.map(this.mapOne) : [];
    const total = raw?.total ?? raw?.meta?.total ?? data.length;

    return { data, total };
  }

  async criarFilme(dto: FilmeCreateDTO): Promise<Filme> {
    const url = `${this.apiUrl}/api/v1/filmes`;
    const raw = await firstValueFrom(this.http.post<any>(url, dto));
    return this.mapOne(raw?.data ?? raw);
  }

  async atualizarFilme(id: number, dto: FilmeCreateDTO): Promise<Filme> {
    const url = `${this.apiUrl}/api/v1/filmes/${id}`;
    const raw = await firstValueFrom(this.http.put<any>(url, dto));
    return this.mapOne(raw?.data ?? raw);
  }

  async deletarFilme(id: number): Promise<void> {
    const url = `${this.apiUrl}/api/v1/filmes/${id}`;
    await firstValueFrom(this.http.delete(url));
  }
}
