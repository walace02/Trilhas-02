import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPontosTuristicos } from '../pontos-turisticos.model';
import { PontosTuristicosService } from '../service/pontos-turisticos.service';

@Component({
  templateUrl: './pontos-turisticos-delete-dialog.component.html',
})
export class PontosTuristicosDeleteDialogComponent {
  pontosTuristicos?: IPontosTuristicos;

  constructor(protected pontosTuristicosService: PontosTuristicosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pontosTuristicosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
