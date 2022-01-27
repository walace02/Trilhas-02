import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFotografias } from '../fotografias.model';
import { FotografiasService } from '../service/fotografias.service';
import { FotografiasDeleteDialogComponent } from '../delete/fotografias-delete-dialog.component';

@Component({
  selector: 'jhi-fotografias',
  templateUrl: './fotografias.component.html',
})
export class FotografiasComponent implements OnInit {
  fotografias?: IFotografias[];
  isLoading = false;

  constructor(protected fotografiasService: FotografiasService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.fotografiasService.query().subscribe({
      next: (res: HttpResponse<IFotografias[]>) => {
        this.isLoading = false;
        this.fotografias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IFotografias): number {
    return item.id!;
  }

  delete(fotografias: IFotografias): void {
    const modalRef = this.modalService.open(FotografiasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fotografias = fotografias;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
