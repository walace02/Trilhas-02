import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrilhas } from '../trilhas.model';

@Component({
  selector: 'jhi-trilhas-detail',
  templateUrl: './trilhas-detail.component.html',
})
export class TrilhasDetailComponent implements OnInit {
  trilhas: ITrilhas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trilhas }) => {
      this.trilhas = trilhas;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
