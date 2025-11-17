import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilmesModalComponent } from '../filmes-modal/filmes-modal.component';


@Component({
  selector: 'app-filmes-lista',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './filmes-lista.component.html',
  styleUrl: './filmes-lista.component.css'
})
export class FilmesListaComponent {
  private modalService = inject(NgbModal);

  constructor() {}

  abrirModalAdicionar(){
    const modalRef= this.modalService.open(FilmesModalComponent,{
      size:'lg',
      centered: true
    });

    // o que acontece quando o modal fecha
    modalRef.result.then(
      (result) => {
        // O modal foi fechado com "Salvar"
        console.log('Modal fechado com sucesso:', result);
      },
      (reason) => {
        // O modal foi fechado com "Cancelar" ou "X"
        console.log('Modal dispensado:', reason);
      }
    );
  }

}
