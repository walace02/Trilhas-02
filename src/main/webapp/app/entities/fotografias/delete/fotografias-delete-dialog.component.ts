import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFotografias } from '../fotografias.model';
import { FotografiasService } from '../service/fotografias.service';

@Component({
  templateUrl: './fotografias-delete-dialog.component.html',
})
export class FotografiasDeleteDialogComponent {
  fotografias?: IFotografias;

  constructor(protected fotografiasService: FotografiasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fotografiasService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
