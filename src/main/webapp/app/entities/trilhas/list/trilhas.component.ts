import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrilhas } from '../trilhas.model';
import { TrilhasService } from '../service/trilhas.service';
import { TrilhasDeleteDialogComponent } from '../delete/trilhas-delete-dialog.component';

@Component({
  selector: 'jhi-trilhas',
  templateUrl: './trilhas.component.html',
})
export class TrilhasComponent implements OnInit {
  trilhas?: ITrilhas[];
  isLoading = false;

  constructor(protected trilhasService: TrilhasService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.trilhasService.query().subscribe({
      next: (res: HttpResponse<ITrilhas[]>) => {
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

  trackId(index: number, item: ITrilhas): number {
    return item.id!;
  }

  delete(trilhas: ITrilhas): void {
    const modalRef = this.modalService.open(TrilhasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trilhas = trilhas;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
