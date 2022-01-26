import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICadastroTrilha } from '../cadastro-trilha.model';

@Component({
  selector: 'jhi-cadastro-trilha-detail',
  templateUrl: './cadastro-trilha-detail.component.html',
})
export class CadastroTrilhaDetailComponent implements OnInit {
  cadastroTrilha: ICadastroTrilha | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadastroTrilha }) => {
      this.cadastroTrilha = cadastroTrilha;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
