import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPontosVenda } from '../pontos-venda.model';
import { PontosVendaService } from '../service/pontos-venda.service';
import { PontosVendaDeleteDialogComponent } from '../delete/pontos-venda-delete-dialog.component';

@Component({
  selector: 'jhi-pontos-venda',
  templateUrl: './pontos-venda.component.html',
})
export class PontosVendaComponent implements OnInit {
  pontosVendas?: IPontosVenda[];
  isLoading = false;

  constructor(protected pontosVendaService: PontosVendaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pontosVendaService.query().subscribe({
      next: (res: HttpResponse<IPontosVenda[]>) => {
        this.isLoading = false;
        this.pontosVendas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPontosVenda): number {
    return item.id!;
  }

  delete(pontosVenda: IPontosVenda): void {
    const modalRef = this.modalService.open(PontosVendaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pontosVenda = pontosVenda;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
