import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPontosVenda } from '../pontos-venda.model';

@Component({
  selector: 'jhi-pontos-venda-detail',
  templateUrl: './pontos-venda-detail.component.html',
})
export class PontosVendaDetailComponent implements OnInit {
  pontosVenda: IPontosVenda | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosVenda }) => {
      this.pontosVenda = pontosVenda;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
