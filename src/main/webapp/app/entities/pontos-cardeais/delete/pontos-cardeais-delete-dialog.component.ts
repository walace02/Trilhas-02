import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPontosCardeais } from '../pontos-cardeais.model';
import { PontosCardeaisService } from '../service/pontos-cardeais.service';

@Component({
  templateUrl: './pontos-cardeais-delete-dialog.component.html',
})
export class PontosCardeaisDeleteDialogComponent {
  pontosCardeais?: IPontosCardeais;

  constructor(protected pontosCardeaisService: PontosCardeaisService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pontosCardeaisService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
