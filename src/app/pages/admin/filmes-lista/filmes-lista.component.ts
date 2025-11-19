import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilmesModalComponent } from '../filmes-modal/filmes-modal.component';
import { FilmeApiService } from '../../../services/filme-api.service';
import { Filme } from '../../../models/filme.model';
import { Subject, takeUntil, debounceTime } from 'rxjs';

@Component({
  selector: 'app-filmes-lista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './filmes-lista.component.html',
  styleUrl: './filmes-lista.component.css'
})
export class FilmesListaComponent implements OnInit, OnDestroy {

  private modalService = inject(NgbModal);
  private filmeService = inject(FilmeApiService);

  filmes = signal<Filme[]>([]);
  totalFilmes = signal(0);

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.carregarFilmes();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(termoDeBusca => {
      this.carregarFilmes(termoDeBusca || undefined);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async carregarFilmes(titulo?: string) {
    try {
      const response = await this.filmeService.getFilmes(1, 20, titulo);
      this.filmes.set(response.data);
      this.totalFilmes.set(response.total);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  }

  abrirModalAdicionar() {
    const modalRef = this.modalService.open(FilmesModalComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.result.then(
      (result) => {
        this.filmes.update(listaAtual => [result, ...listaAtual]);
        this.totalFilmes.update(total => total + 1);
      },
      (reason) => {
        console.log('Modal dispensado:', reason);
      }
    );
  }

  async deletarFilme(idDoFilme: number) {
    if (!confirm('Tem certeza que deseja excluir este filme?')) {
      return;
    }

    try {
      await this.filmeService.deletarFilme(idDoFilme);

      this.filmes.update(listaAtual =>
        listaAtual.filter(filme => filme.id !== idDoFilme)
      );
      this.totalFilmes.update(total => total - 1);
    } catch (error) {
      console.error('Erro ao deletar o filme:', error);
      alert('Erro ao deletar o filme. Tente novamente.');
    }
  }

  abrirModalEditar(filme: Filme) {
    const modalRef = this.modalService.open(FilmesModalComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.filmeParaEditar = filme;

    modalRef.result.then(
      (filmeAtualizado: Filme) => {
        this.filmes.update(listaAtual => {
          return listaAtual.map(f =>
            f.id === filmeAtualizado.id ? filmeAtualizado : f
          );
        });
      },
      (reason) => {
        console.log('Modal edição dispensado:', reason);
      }
    );
  }

  // ⭐⭐⭐ AQUI ENTRA O MÉTODO QUE VOCÊ QUERIA ⭐⭐⭐
  classeMood(nome?: string): string {
    if (!nome) return 'tag-mood--default';

    const mood = nome.toLowerCase();

    if (mood.includes('inspira')) return 'tag-mood--inspirado';
    if (mood.includes('reflex')) return 'tag-mood--reflexivo';
    if (mood.includes('despreoc')) return 'tag-mood--despreocupado';
    if (mood.includes('diferent')) return 'tag-mood--diferentao';
    if (mood.includes('emocion')) return 'tag-mood--emocionado';
    if (mood.includes('empolg')) return 'tag-mood--empolgado';
    if (mood.includes('nost')) return 'tag-mood--nostalgico';
    if (mood.includes('otim')) return 'tag-mood--otimista';
    if (mood.includes('surpr')) return 'tag-mood--surpreso';

    return 'tag-mood--default';
  }

}
