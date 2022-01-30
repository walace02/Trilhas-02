import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';
import { CadastroTrilhaDeleteDialogComponent } from '../delete/cadastro-trilha-delete-dialog.component';

@Component({
  selector: 'jhi-cadastro-trilha',
  templateUrl: './cadastro-trilha.component.html',
})
export class CadastroTrilhaComponent implements OnInit {
  cadastroTrilhas?: ICadastroTrilha[];
  isLoading = false;

  constructor(protected cadastroTrilhaService: CadastroTrilhaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cadastroTrilhaService.query().subscribe({
      next: (res: HttpResponse<ICadastroTrilha[]>) => {
        this.isLoading = false;
        this.cadastroTrilhas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICadastroTrilha): number {
    return item.id!;
  }

  delete(cadastroTrilha: ICadastroTrilha): void {
    const modalRef = this.modalService.open(CadastroTrilhaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cadastroTrilha = cadastroTrilha;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
