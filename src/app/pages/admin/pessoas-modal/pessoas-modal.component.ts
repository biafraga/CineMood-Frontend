import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaApiService } from '../../../services/pessoa-api.service';
import { Pessoa } from '../../../models/pessoa.model';

@Component({
  selector: 'app-pessoas-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './pessoas-modal.component.html',
  styleUrl: './pessoas-modal.component.css'
})
export class PessoasModalComponent implements OnInit {

  @Input() pessoaParaEditar?: Pessoa;

  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private pessoaService = inject(PessoaApiService);

  loading = signal(false);

  pessoaForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    biografia: [''], 
    fotoUrl: [''], 
  });

  get modoEdicao(): boolean {
    return !!this.pessoaParaEditar;
  }

  constructor() { }

  ngOnInit(): void {
    if (this.modoEdicao && this.pessoaParaEditar) {
      this.pessoaForm.patchValue({
        nome: this.pessoaParaEditar.nome,
        biografia: this.pessoaParaEditar.biografia,
        fotoUrl: this.pessoaParaEditar.fotoUrl,
      });
    }
  }

  async salvar() {
    this.pessoaForm.markAllAsTouched();
    if (this.pessoaForm.invalid) return;

    this.loading.set(true);

    try {
      const dadosDoFormulario = this.pessoaForm.value;

      if (this.modoEdicao && this.pessoaParaEditar) {
        //MODO EDIÇÃO
        const pessoaAtualizada = await this.pessoaService.atualizarPessoa(
          this.pessoaParaEditar.id,
          dadosDoFormulario
        );
        this.loading.set(false);
        this.activeModal.close(pessoaAtualizada); // Devolve a Pessoa ATUALIZADA

      } else {
        //MODO CRIAÇÃO
        const pessoaSalva = await this.pessoaService.criarPessoa(dadosDoFormulario);
        this.loading.set(false);
        this.activeModal.close(pessoaSalva); // Devolve a Pessoa NOVA
      }

    } catch (error) {
      console.error('Erro ao salvar a pessoa:', error);
      this.loading.set(false);
    }
  }
}