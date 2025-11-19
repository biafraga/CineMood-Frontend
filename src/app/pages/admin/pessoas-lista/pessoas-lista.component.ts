import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PessoasModalComponent } from '../pessoas-modal/pessoas-modal.component';
import { PessoaApiService } from '../../../services/pessoa-api.service';
import { Pessoa } from '../../../models/pessoa.model';
import { Subject, takeUntil, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pessoas-lista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './pessoas-lista.component.html',
  styleUrl: './pessoas-lista.component.css'
})
export class PessoasListaComponent implements OnInit, OnDestroy {

  private pessoaService = inject(PessoaApiService);
  private modalService = inject(NgbModal);

  pessoas = signal<Pessoa[]>([]);
  totalPessoas = signal(0);

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.carregarPessoas();
    
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(termoDeBusca => {
      this.carregarPessoas(termoDeBusca || undefined);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async carregarPessoas(nome?: string) {
    try {
      const response = await this.pessoaService.getPessoas(1, 20, nome); 
      this.pessoas.set(response.data);
      this.totalPessoas.set(response.total);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  }

  abrirModalAdicionar() {
    const modalRef = this.modalService.open(PessoasModalComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.result.then(
      (pessoaSalva: Pessoa) => {
        this.pessoas.update(lista => [pessoaSalva, ...lista]);
        this.totalPessoas.update(total => total + 1);
      },
      () => {}
    );
  }

  //Função de Editar (Caneta)
  abrirModalEditar(pessoa: Pessoa) {
    const modalRef = this.modalService.open(PessoasModalComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.pessoaParaEditar = pessoa;

    modalRef.result.then(
      (pessoaAtualizada: Pessoa) => {
        this.pessoas.update(lista => 
          lista.map(p => p.id === pessoaAtualizada.id ? pessoaAtualizada : p)
        );
      },
      () => {}
    );
  }

  // Função de Deletar (Lixeira)
  async deletarPessoa(idDaPessoa: number) {
    if (!confirm('Tem certeza que deseja excluir esta pessoa?')) return;

    try {
      await this.pessoaService.deletarPessoa(idDaPessoa);
      this.pessoas.update(lista => lista.filter(p => p.id !== idDaPessoa));
      this.totalPessoas.update(total => total - 1);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  }
}