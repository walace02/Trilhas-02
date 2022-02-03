import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrilha } from '../trilha.model';
import { TrilhaService } from '../service/trilha.service';
import { TrilhaDeleteDialogComponent } from '../delete/trilha-delete-dialog.component';

@Component({
  selector: 'jhi-trilha',
  templateUrl: './trilha.component.html',
})
export class TrilhaComponent implements OnInit {
  trilhas?: ITrilha[];
  isLoading = false;

  constructor(protected trilhaService: TrilhaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.trilhaService.query().subscribe({
      next: (res: HttpResponse<ITrilha[]>) => {
        this.isLoading = false;
        this.trilhas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITrilha): number {
    return item.id!;
  }

  delete(trilha: ITrilha): void {
    const modalRef = this.modalService.open(TrilhaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trilha = trilha;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
