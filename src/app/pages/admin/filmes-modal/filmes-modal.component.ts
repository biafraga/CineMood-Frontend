import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FilmeApiService } from '../../../services/filme-api.service';
import { Filme, FilmeCreateDTO } from '../../../models/filme.model';

@Component({
  selector: 'app-filmes-modal',
  standalone: true,
  templateUrl: './filmes-modal.component.html',
  styleUrls: ['./filmes-modal.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class FilmesModalComponent {
  private fb = inject(FormBuilder);
  private filmeApi = inject(FilmeApiService);
  activeModal = inject(NgbActiveModal);

  @Input() filme: Filme | null = null;
  modoEdicao = false;

  loading = signal(false);

  filmeForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    anoLancamento: ['', Validators.required],
    sinopse: ['', Validators.required],
    posterUrl: ['', Validators.required],
    fraseEfeito: [''],
  });

  ngOnInit() {
    if (this.filme) {
      this.modoEdicao = true;
      this.filmeForm.patchValue({
        titulo: this.filme.titulo,
        anoLancamento: this.filme.anoLancamento,
        sinopse: this.filme.sinopse,
        posterUrl: this.filme.posterUrl,
        fraseEfeito: this.filme.fraseEfeito,
      });
    }
  }

  async salvar() {
    if (this.filmeForm.invalid) return;

    this.loading.set(true);

    try {
      const dto = this.filmeForm.value as FilmeCreateDTO;

      if (this.modoEdicao && this.filme) {
        const atualizado = await this.filmeApi.atualizarFilme(this.filme.id, dto);
        this.activeModal.close(atualizado);
      } else {
        const criado = await this.filmeApi.criarFilme(dto);
        this.activeModal.close(criado);
      }
    } catch (err) {
      console.error('Erro ao salvar filme', err);
    } finally {
      this.loading.set(false);
    }
  }
}
