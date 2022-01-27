import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPontosTuristicos } from '../pontos-turisticos.model';

@Component({
  selector: 'jhi-pontos-turisticos-detail',
  templateUrl: './pontos-turisticos-detail.component.html',
})
export class PontosTuristicosDetailComponent implements OnInit {
  pontosTuristicos: IPontosTuristicos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosTuristicos }) => {
      this.pontosTuristicos = pontosTuristicos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
