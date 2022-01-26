import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrilhas } from '../trilhas.model';
import { TrilhasService } from '../service/trilhas.service';

@Component({
  templateUrl: './trilhas-delete-dialog.component.html',
})
export class TrilhasDeleteDialogComponent {
  trilhas?: ITrilhas;

  constructor(protected trilhasService: TrilhasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trilhasService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
