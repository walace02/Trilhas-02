import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPontosCardeais } from '../pontos-cardeais.model';

@Component({
  selector: 'jhi-pontos-cardeais-detail',
  templateUrl: './pontos-cardeais-detail.component.html',
})
export class PontosCardeaisDetailComponent implements OnInit {
  pontosCardeais: IPontosCardeais | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosCardeais }) => {
      this.pontosCardeais = pontosCardeais;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
