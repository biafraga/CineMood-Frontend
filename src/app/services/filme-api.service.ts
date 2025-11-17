import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FilmesPaginados, FilmeCreateDTO, Filme } from '../models/filme.model'; 
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeApiService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }
 
  async getFilmes(page: number, limit: number): Promise<FilmesPaginados> {
    const url = `${this.apiUrl}/api/v1/filmes`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const response = await firstValueFrom(
      this.http.get<FilmesPaginados>(url, { params })
    );
    // (Se a API só retorna a lista, "fingimos" o total por enquanto)
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
}