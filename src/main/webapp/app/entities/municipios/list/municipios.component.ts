import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMunicipios } from '../municipios.model';
import { MunicipiosService } from '../service/municipios.service';
import { MunicipiosDeleteDialogComponent } from '../delete/municipios-delete-dialog.component';

@Component({
  selector: 'jhi-municipios',
  templateUrl: './municipios.component.html',
})
export class MunicipiosComponent implements OnInit {
  municipios?: IMunicipios[];
  isLoading = false;

  constructor(protected municipiosService: MunicipiosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.municipiosService.query().subscribe({
      next: (res: HttpResponse<IMunicipios[]>) => {
        this.isLoading = false;
        this.municipios = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMunicipios): number {
    return item.id!;
  }

  delete(municipios: IMunicipios): void {
    const modalRef = this.modalService.open(MunicipiosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.municipios = municipios;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
