import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMunicipios } from '../municipios.model';
import { MunicipiosService } from '../service/municipios.service';

@Component({
  templateUrl: './municipios-delete-dialog.component.html',
})
export class MunicipiosDeleteDialogComponent {
  municipios?: IMunicipios;

  constructor(protected municipiosService: MunicipiosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.municipiosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
