import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmeApiService } from '../../../services/filme-api.service';
import { MoodApiService } from '../../../services/mood-api.service';     // NOVO
import { PessoaApiService } from '../../../services/pessoa-api.service'; // NOVO
import { Filme, AssociarMoodDTO, AssociarPessoaDTO } from '../../../models/filme.model';
import { Mood } from '../../../models/mood.model';
import { Pessoa } from '../../../models/pessoa.model';

@Component({
  selector: 'app-filmes-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filmes-modal.component.html',
  styleUrl: './filmes-modal.component.css'
})
export class FilmesModalComponent implements OnInit {

  @Input() filmeParaEditar?: Filme;

  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private filmeService = inject(FilmeApiService);
  private moodService = inject(MoodApiService);     // INJETADO
  private pessoaService = inject(PessoaApiService); // INJETADO

  loading = signal(false);
  
  // Listas para os <select>
  listaMoods = signal<Mood[]>([]);
  listaDiretores = signal<Pessoa[]>([]);

  // ATUALIZADO: Adiciona idMood e idDiretor (Mesmo que a API associe depois)
  filmeForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    anoLancamento: [null, [Validators.required, Validators.min(1888)]],
    sinopse: ['', [Validators.required]],
    posterUrl: ['', [Validators.required]],
    fraseEfeito: [''],
    idMood: [null, [Validators.required]],       // NOVO: Mood
    idDiretor: [null, [Validators.required]]     // NOVO: Diretor
  });

  get modoEdicao(): boolean { return !!this.filmeParaEditar; }

  constructor() { }

  ngOnInit(): void {
    this.carregarListas(); // Carrega Moods e Pessoas ao abrir

    if (this.modoEdicao && this.filmeParaEditar) {
      this.filmeForm.patchValue({
        titulo: this.filmeParaEditar.titulo,
        anoLancamento: this.filmeParaEditar.anoLancamento,
        sinopse: this.filmeParaEditar.sinopse,
        posterUrl: this.filmeParaEditar.posterUrl,
        fraseEfeito: this.filmeParaEditar.fraseEfeito,
        // Nota: Mood e Diretor só serão preenchidos na Edição se a lista principal for atualizada.
      });
    }
  }

  // NOVO: Carrega as listas para os Dropdowns
  async carregarListas() {
    try {
      // Pedimos a lista completa de Moods e Pessoas
      const moods = await this.moodService.getMoods(1, 100);
      const pessoas = await this.pessoaService.getPessoas(1, 100);
      
      this.listaMoods.set(moods.data);
      this.listaDiretores.set(pessoas.data);
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  }

  // Função "Salvar" ATUALIZADA para lidar com a CADEIA DE ASSOCIAÇÃO
  async salvar() {
    this.filmeForm.markAllAsTouched();
    if (this.filmeForm.invalid) return;

    this.loading.set(true);
    try {
      const formValues = this.filmeForm.value;
      let filmeSalvo: Filme;

      // 1. Salva/Atualiza o Filme Básico (sem Mood/Diretor)
      if (this.modoEdicao && this.filmeParaEditar) {
        filmeSalvo = await this.filmeService.atualizarFilme(this.filmeParaEditar.id, formValues);
      } else {
        filmeSalvo = await this.filmeService.criarFilme(formValues);
      }

      // 2. FAZ AS ASSOCIAÇÕES! (Isto é a curadoria)
      await this.associar(filmeSalvo.id, formValues.idMood, formValues.idDiretor);

      this.loading.set(false);
      this.activeModal.close(filmeSalvo); // Devolve o filme salvo
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      this.loading.set(false);
    }
  }
  
  // FUNÇÃO AUXILIAR PARA ASSOCIAÇÃO (A alma do projeto)
  private async associar(idFilme: number, idMood: number, idDiretor: number) {
    const promises = [];

    // Promessa 1: Associar Mood
    if (idMood) {
      const moodDto: AssociarMoodDTO = { idFilme, idsMood: [idMood] };
      promises.push(this.filmeService.associarMood(moodDto));
    }

    // Promessa 2: Associar Diretor (Pessoa)
    if (idDiretor) {
      const pessoaDto: AssociarPessoaDTO = { idFilme, idPessoa: idDiretor, papel: 'Diretor' };
      promises.push(this.filmeService.associarPessoa(pessoaDto));
    }

    // Espera que todas as associações terminem
    await Promise.all(promises);
  }
}