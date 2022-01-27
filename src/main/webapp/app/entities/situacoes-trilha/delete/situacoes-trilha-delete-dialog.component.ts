import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISituacoesTrilha } from '../situacoes-trilha.model';
import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';

@Component({
  templateUrl: './situacoes-trilha-delete-dialog.component.html',
})
export class SituacoesTrilhaDeleteDialogComponent {
  situacoesTrilha?: ISituacoesTrilha;

  constructor(protected situacoesTrilhaService: SituacoesTrilhaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.situacoesTrilhaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
