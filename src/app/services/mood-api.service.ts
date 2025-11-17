import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MoodsPaginados } from '../models/mood.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  //Busca uma lista paginada de moods da API(Rota: GET /api/v1/moods)
  async getMoods(page: number, limit: number): Promise<MoodsPaginados> {
    const url = `${this.apiUrl}/api/v1/moods`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const response = await firstValueFrom(
      this.http.get<MoodsPaginados>(url, { params })
    );

    return response;
  }
}
