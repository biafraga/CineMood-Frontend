import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FilmesPaginados, FilmeCreateDTO, Filme, AssociarMoodDTO, AssociarPessoaDTO } from '../models/filme.model'; 
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeApiService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }
 
  async getFilmes(page: number, limit: number, titulo?: string): Promise<FilmesPaginados> {
    const url = `${this.apiUrl}/api/v1/filmes`;
    let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

    if (titulo) {
      params = params.set('titulo', titulo);
    }

    const response = await firstValueFrom(
      this.http.get<FilmesPaginados>(url, { params })
    );
    return response;
  }

  async criarFilme(filmeData: FilmeCreateDTO): Promise<Filme> {
    const url = `${this.apiUrl}/api/v1/filmes`;

    const token = localStorage.getItem('app-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const response = await firstValueFrom(
      this.http.post<Filme>(url, filmeData, { headers })
    );

    return response;
  }

  async deletarFilme(id: number): Promise<void> {
    const url = `${this.apiUrl}/api/v1/filmes/${id}`; 

    const token = localStorage.getItem('app-token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    await firstValueFrom(
      this.http.delete(url, { headers })
    );
  }

  async atualizarFilme(id: number, filmeData: FilmeCreateDTO): Promise<Filme> {
  const url = `${this.apiUrl}/api/v1/filmes/${id}`; // Rota de update

  const token = localStorage.getItem('app-token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const response = await firstValueFrom(
    this.http.put<Filme>(url, filmeData, { headers })
  );

  return response;
  }

  async associarMood(dto: AssociarMoodDTO): Promise<void> {
    const url = `${this.apiUrl}/api/v1/filmes/associar-mood`;
    const token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    await firstValueFrom(this.http.post(url, dto, { headers }));
  }

  async associarPessoa(dto: AssociarPessoaDTO): Promise<void> {
    const url = `${this.apiUrl}/api/v1/filmes/associar-pessoa`;
    const token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    await firstValueFrom(this.http.post(url, dto, { headers }));
  }

  async getDetalhesFilme(id: number): Promise<any> {
  const url = `${this.apiUrl}/api/v1/filmes/${id}`;

  return await firstValueFrom(
    this.http.get<any>(url)
  );
}

}


