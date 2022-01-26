import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMunicipios } from '../municipios.model';

@Component({
  selector: 'jhi-municipios-detail',
  templateUrl: './municipios-detail.component.html',
})
export class MunicipiosDetailComponent implements OnInit {
  municipios: IMunicipios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ municipios }) => {
      this.municipios = municipios;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
