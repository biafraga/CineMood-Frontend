import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FilmeApiService } from '../../../services/filme-api.service';
import { Filme, FilmeCreateDTO } from '../../../models/filme.model';

@Component({
  selector: 'app-filmes-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filmes-modal.component.html',
  styleUrls: ['./filmes-modal.component.css']
})
export class FilmesModalComponent implements OnInit {
  @Input() filmeParaEditar: Filme | null = null;
  @Output() closed = new EventEmitter<Filme | null>();

  private fb = inject(FormBuilder);
  private filmeApi = inject(FilmeApiService);

  loading = signal(false);

  filmeForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    
    anoLancamento: [new Date().getFullYear(), [Validators.required, Validators.min(1888)]],
    
    sinopse: [''],
    
    posterUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    
    fraseEfeito: ['']
  });

  get modoEdicao() { return !!this.filmeParaEditar; }

  ngOnInit(): void {
    if (this.filmeParaEditar) {
      this.filmeForm.patchValue({
        titulo: this.filmeParaEditar.titulo,
        anoLancamento: this.filmeParaEditar.anoLancamento,
        sinopse: this.filmeParaEditar.sinopse ?? '',
        posterUrl: this.filmeParaEditar.posterUrl ?? '',
        fraseEfeito: this.filmeParaEditar.fraseEfeito ?? ''
      });
    }
  }

  fechar() { this.closed.emit(null); }

  async salvar() {
    this.filmeForm.markAllAsTouched();
    if (this.filmeForm.invalid) return;

    this.loading.set(true);
    const dto = this.filmeForm.value as FilmeCreateDTO;

    try {
      const salvo = this.modoEdicao && this.filmeParaEditar
        ? await this.filmeApi.atualizarFilme(this.filmeParaEditar.id, dto)
        : await this.filmeApi.criarFilme(dto);

      this.closed.emit(salvo);
    } catch (e) {
      console.error('erro ao salvar filme', e);
    } finally {
      this.loading.set(false);
    }
  }
}