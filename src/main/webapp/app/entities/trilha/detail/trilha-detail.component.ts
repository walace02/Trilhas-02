import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrilha } from '../trilha.model';

@Component({
  selector: 'jhi-trilha-detail',
  templateUrl: './trilha-detail.component.html',
})
export class TrilhaDetailComponent implements OnInit {
  trilha: ITrilha | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trilha }) => {
      this.trilha = trilha;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
