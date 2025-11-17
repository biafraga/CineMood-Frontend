import { Component, OnInit, inject, signal } from '@angular/core';
import { FilmeApiService } from '../../../services/filme-api.service';
import { PessoaApiService } from '../../../services/pessoa-api.service';
import { MoodApiService } from '../../../services/mood-api.service';
import { Filme } from '../../../models/filme.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private filmeService = inject(FilmeApiService);
  private pessoaService = inject(PessoaApiService);
  private moodService = inject(MoodApiService);

  totalFilmes = signal(0);
  totalPessoas = signal(0);
  totalMoods = signal(0);
  ultimosFilmes = signal<Filme[]>([]);

  constructor() { }

  ngOnInit(): void{
    this.carregarDados();
  }

  async carregarDados(){
    try{
      const filmesResponse = await this.filmeService.getFilmes(1, 1);
      const pessoasResponse = await this.pessoaService.getPessoas(1, 1);
      const moodsResponse = await this.moodService.getMoods(1, 1);

      // Atualiza os Signals com os totais reais da API
      this.totalFilmes.set(filmesResponse.total);
      this.totalPessoas.set(pessoasResponse.total);
      this.totalMoods.set(moodsResponse.total);

      const ultimosFilmesResponse = await this.filmeService.getFilmes(1, 3);
      this.ultimosFilmes.set(ultimosFilmesResponse.data);
    }catch (error){
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  }

}
