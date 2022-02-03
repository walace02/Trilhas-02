import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPontosVenda } from '../pontos-venda.model';
import { PontosVendaService } from '../service/pontos-venda.service';

@Component({
  templateUrl: './pontos-venda-delete-dialog.component.html',
})
export class PontosVendaDeleteDialogComponent {
  pontosVenda?: IPontosVenda;

  constructor(protected pontosVendaService: PontosVendaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pontosVendaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
