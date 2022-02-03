import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrilha } from '../trilha.model';
import { TrilhaService } from '../service/trilha.service';

@Component({
  templateUrl: './trilha-delete-dialog.component.html',
})
export class TrilhaDeleteDialogComponent {
  trilha?: ITrilha;

  constructor(protected trilhaService: TrilhaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trilhaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
