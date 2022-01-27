import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFotografias } from '../fotografias.model';

@Component({
  selector: 'jhi-fotografias-detail',
  templateUrl: './fotografias-detail.component.html',
})
export class FotografiasDetailComponent implements OnInit {
  fotografias: IFotografias | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fotografias }) => {
      this.fotografias = fotografias;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
