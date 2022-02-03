import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPontosTuristicos } from '../pontos-turisticos.model';
import { PontosTuristicosService } from '../service/pontos-turisticos.service';
import { PontosTuristicosDeleteDialogComponent } from '../delete/pontos-turisticos-delete-dialog.component';

@Component({
  selector: 'jhi-pontos-turisticos',
  templateUrl: './pontos-turisticos.component.html',
})
export class PontosTuristicosComponent implements OnInit {
  pontosTuristicos?: IPontosTuristicos[];
  isLoading = false;

  constructor(protected pontosTuristicosService: PontosTuristicosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pontosTuristicosService.query().subscribe({
      next: (res: HttpResponse<IPontosTuristicos[]>) => {
        this.isLoading = false;
        this.pontosTuristicos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPontosTuristicos): number {
    return item.id!;
  }

  delete(pontosTuristicos: IPontosTuristicos): void {
    const modalRef = this.modalService.open(PontosTuristicosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pontosTuristicos = pontosTuristicos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
