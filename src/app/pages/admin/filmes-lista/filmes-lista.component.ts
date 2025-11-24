import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { FilmeApiService } from '../../../services/filme-api.service';
import { Filme } from '../../../models/filme.model';
import { FilmesModalComponent } from '../filmes-modal/filmes-modal.component';

@Component({
  selector: 'app-filmes-lista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilmesModalComponent],
  templateUrl: './filmes-lista.component.html',
  styleUrls: ['./filmes-lista.component.css']
})
export class FilmesListaComponent implements OnInit, OnDestroy {
  private filmesApi = inject(FilmeApiService);

  filmes = signal<Filme[]>([]);
  total = signal(0);

  // estado do modal inline
  modalAberto = signal(false);
  filmeEmEdicao = signal<Filme | null>(null);

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.carregarFilmes();
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(q => this.carregarFilmes(q || undefined));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async carregarFilmes(titulo?: string) {
    try {
      const res = await this.filmesApi.getFilmes(1, 20, titulo);
      this.filmes.set(res.data ?? []);
      this.total.set(res.total ?? 0);
    } catch (e) {
      console.error('erro ao carregar filmes', e);
      this.filmes.set([]); this.total.set(0);
    }
  }

  abrirModalAdicionar() {
    this.filmeEmEdicao.set(null);
    this.modalAberto.set(true);
  }

  abrirModalEditar(f: Filme) {
    this.filmeEmEdicao.set(f);
    this.modalAberto.set(true);
  }

  onModalClosed(filme: Filme | null) {
    this.modalAberto.set(false);
    if (!filme) return;

    const exists = this.filmes().some(x => x.id === filme.id);
    this.filmes.update(list => exists
      ? list.map(x => x.id === filme.id ? filme : x)
      : [filme, ...list]
    );
    if (!exists) this.total.update(t => t + 1);
  }

  async deletar(id: number) {
    if (!confirm('tem certeza que deseja excluir?')) return;
    try {
      await this.filmesApi.deletarFilme(id);
      this.filmes.update(list => list.filter(f => f.id !== id));
      this.total.update(t => Math.max(0, this.total() - 1));
    } catch (e) {
      console.error('erro ao deletar', e);
    }
  }
}
