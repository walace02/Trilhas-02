import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISituacoesTrilha } from '../situacoes-trilha.model';

@Component({
  selector: 'jhi-situacoes-trilha-detail',
  templateUrl: './situacoes-trilha-detail.component.html',
})
export class SituacoesTrilhaDetailComponent implements OnInit {
  situacoesTrilha: ISituacoesTrilha | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ situacoesTrilha }) => {
      this.situacoesTrilha = situacoesTrilha;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
