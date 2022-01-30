import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';

@Component({
  templateUrl: './cadastro-trilha-delete-dialog.component.html',
})
export class CadastroTrilhaDeleteDialogComponent {
  cadastroTrilha?: ICadastroTrilha;

  constructor(protected cadastroTrilhaService: CadastroTrilhaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cadastroTrilhaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
