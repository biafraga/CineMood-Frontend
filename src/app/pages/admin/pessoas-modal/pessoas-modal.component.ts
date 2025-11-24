import { Component, EventEmitter, Input, Output, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaApiService } from '../../../services/pessoa-api.service';
import { Pessoa } from '../../../models/pessoa.model';

@Component({
  selector: 'app-pessoas-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pessoas-modal.component.html',
  styleUrls: ['./pessoas-modal.component.css']
})
export class PessoasModalComponent implements OnInit {
  @Input() pessoaParaEditar: Pessoa | null = null;
  @Output() closed = new EventEmitter<Pessoa | null>(); // devolve a pessoa criada/atualizada, ou null

  private fb = inject(FormBuilder);
  private pessoaApi = inject(PessoaApiService);

  loading = signal(false);

  pessoaForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    biografia: [''],
    fotoUrl: ['']
  });

  ngOnInit(): void {
    if (this.pessoaParaEditar) {
      this.pessoaForm.patchValue({
        nome: this.pessoaParaEditar.nome,
        biografia: this.pessoaParaEditar.biografia,
        fotoUrl: this.pessoaParaEditar.fotoUrl
      });
    }
  }

  cancelar() {
    this.closed.emit(null);
  }

  async salvar() {
    this.pessoaForm.markAllAsTouched();
    if (this.pessoaForm.invalid) return;

    this.loading.set(true);
    try {
      const dto = this.pessoaForm.value;

      if (this.pessoaParaEditar) {
        const atualizada = await this.pessoaApi.atualizarPessoa(this.pessoaParaEditar.id, dto);
        this.closed.emit(atualizada);
      } else {
        const criada = await this.pessoaApi.criarPessoa(dto);
        this.closed.emit(criada);
      }
    } catch (e) {
      console.error('erro ao salvar pessoa', e);
    } finally {
      this.loading.set(false);
    }
  }
}
