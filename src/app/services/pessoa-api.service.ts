import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { PessoasPaginadas, PessoaCreateDTO, Pessoa } from '../models/pessoa.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaApiService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private baseUrl = `${this.apiUrl}/api/v1/pessoas`;

  constructor() { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('app-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  async getPessoas(page: number, limit: number, nome?: string): Promise<PessoasPaginadas> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (nome) {
      params = params.set('nome', nome);
    }
    
    const response = await firstValueFrom(
      this.http.get<PessoasPaginadas>(this.baseUrl, { params })
    );
    
    return response;
  }

  async criarPessoa(pessoaData: PessoaCreateDTO): Promise<Pessoa> {
    const headers = this.getAuthHeaders();
    const response = await firstValueFrom(
      this.http.post<Pessoa>(this.baseUrl, pessoaData, { headers })
    );
    return response;
  }

  async atualizarPessoa(id: number, pessoaData: PessoaCreateDTO): Promise<Pessoa> {
    const url = `${this.baseUrl}/${id}`;
    const headers = this.getAuthHeaders();
    const response = await firstValueFrom(
      this.http.put<Pessoa>(url, pessoaData, { headers })
    );
    return response;
  }

  async deletarPessoa(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    const headers = this.getAuthHeaders();
    await firstValueFrom(
      this.http.delete(url, { headers })
    );
  }
}