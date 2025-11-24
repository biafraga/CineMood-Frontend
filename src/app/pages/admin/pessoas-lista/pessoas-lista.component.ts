import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { PessoaApiService } from '../../../services/pessoa-api.service';
import { Pessoa } from '../../../models/pessoa.model';
import { PessoasModalComponent } from '../pessoas-modal/pessoas-modal.component';

@Component({
  selector: 'app-pessoas-lista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PessoasModalComponent],
  templateUrl: './pessoas-lista.component.html',
  styleUrls: ['./pessoas-lista.component.css']
})
export class PessoasListaComponent implements OnInit, OnDestroy {
  private pessoaApi = inject(PessoaApiService);

  pessoas = signal<Pessoa[]>([]);
  totalPessoas = signal(0);

  // modal inline
  modalAberto = signal(false);
  pessoaEmEdicao = signal<Pessoa | null>(null);

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.carregarPessoas();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((q) => this.carregarPessoas(q || undefined));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async carregarPessoas(nome?: string) {
    try {
      const res = await this.pessoaApi.getPessoas(1, 20, nome);
      this.pessoas.set(res.data ?? []);
      this.totalPessoas.set(res.total ?? 0);
    } catch (e) {
      console.error('erro ao carregar pessoas', e);
    }
  }

  abrirModalAdicionar() {
    this.pessoaEmEdicao.set(null);
    this.modalAberto.set(true);
  }

  abrirModalEditar(p: Pessoa) {
    this.pessoaEmEdicao.set(p);
    this.modalAberto.set(true);
  }

  onModalClosed(pessoa: Pessoa | null) {
    this.modalAberto.set(false);
    if (!pessoa) return;

    // se veio com id que já existe -> atualização; senão, inclusão
    const exists = this.pessoas().some(x => x.id === pessoa.id);
    this.pessoas.update(list => {
      if (exists) return list.map(x => x.id === pessoa.id ? pessoa : x);
      return [pessoa, ...list];
    });
    if (!exists) this.totalPessoas.update(t => t + 1);
  }

  async deletarPessoa(id: number) {
    if (!confirm('tem certeza que deseja excluir esta pessoa?')) return;
    try {
      await this.pessoaApi.deletarPessoa(id);
      this.pessoas.update(list => list.filter(p => p.id !== id));
      this.totalPessoas.update(t => Math.max(0, t - 1));
    } catch (e) {
      console.error('erro ao deletar pessoa', e);
    }
  }
}
