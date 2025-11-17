import { Component, OnInit, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmeApiService } from '../../../services/filme-api.service';

@Component({
  selector: 'app-filmes-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './filmes-modal.component.html',
  styleUrl: './filmes-modal.component.css'
})
export class FilmesModalComponent implements OnInit {

  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private filmeService = inject(FilmeApiService);

  loading = signal(false);

  filmeForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    anoLancamento: [null, [Validators.required, Validators.min(1888)]],
    sinopse: ['', [Validators.required]],
    posterUrl: ['', [Validators.required]],
    fraseEfeito: [''],
  });

  constructor() { }

  ngOnInit(): void {
  }

  async salvar() {
    this.filmeForm.markAllAsTouched();

    if (this.filmeForm.invalid) {
      return;
    }
    this.loading.set(true);

    try {
      const dadosDoFormulario = this.filmeForm.value;
      const filmeSalvo = await this.filmeService.criarFilme(dadosDoFormulario);

      this.loading.set(false);
      this.activeModal.close(filmeSalvo);

    } catch (error) {
      console.error('Erro ao salvar o filme:', error);
      this.loading.set(false);
    }
  }
}