import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPontosCardeais } from '../pontos-cardeais.model';
import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { PontosCardeaisDeleteDialogComponent } from '../delete/pontos-cardeais-delete-dialog.component';

@Component({
  selector: 'jhi-pontos-cardeais',
  templateUrl: './pontos-cardeais.component.html',
})
export class PontosCardeaisComponent implements OnInit {
  pontosCardeais?: IPontosCardeais[];
  isLoading = false;

  constructor(protected pontosCardeaisService: PontosCardeaisService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pontosCardeaisService.query().subscribe({
      next: (res: HttpResponse<IPontosCardeais[]>) => {
        this.isLoading = false;
        this.pontosCardeais = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPontosCardeais): number {
    return item.id!;
  }

  delete(pontosCardeais: IPontosCardeais): void {
    const modalRef = this.modalService.open(PontosCardeaisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pontosCardeais = pontosCardeais;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
