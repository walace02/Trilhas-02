import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISituacoesTrilha } from '../situacoes-trilha.model';
import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';
import { SituacoesTrilhaDeleteDialogComponent } from '../delete/situacoes-trilha-delete-dialog.component';

@Component({
  selector: 'jhi-situacoes-trilha',
  templateUrl: './situacoes-trilha.component.html',
})
export class SituacoesTrilhaComponent implements OnInit {
  situacoesTrilhas?: ISituacoesTrilha[];
  isLoading = false;

  constructor(protected situacoesTrilhaService: SituacoesTrilhaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.situacoesTrilhaService.query().subscribe({
      next: (res: HttpResponse<ISituacoesTrilha[]>) => {
        this.isLoading = false;
        this.situacoesTrilhas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISituacoesTrilha): number {
    return item.id!;
  }

  delete(situacoesTrilha: ISituacoesTrilha): void {
    const modalRef = this.modalService.open(SituacoesTrilhaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.situacoesTrilha = situacoesTrilha;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
