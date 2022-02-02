import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { ITrilha } from 'app/entities/trilha/trilha.model';
import { TrilhaService } from 'app/entities/trilha/service/trilha.service';

@Component({
  selector: 'jhi-pontos-cardeais-update',
  templateUrl: './pontos-cardeais-update.component.html',
})
export class PontosCardeaisUpdateComponent implements OnInit {
  isSaving = false;

  trilhasSharedCollection: ITrilha[] = [];

  editForm = this.fb.group({
    id: [],
    latitude: [],
    longitude: [],
    trilha: [],
  });

  constructor(
    protected pontosCardeaisService: PontosCardeaisService,
    protected trilhaService: TrilhaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosCardeais }) => {
      this.updateForm(pontosCardeais);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pontosCardeais = this.createFromForm();
    if (pontosCardeais.id !== undefined) {
      this.subscribeToSaveResponse(this.pontosCardeaisService.update(pontosCardeais));
    } else {
      this.subscribeToSaveResponse(this.pontosCardeaisService.create(pontosCardeais));
    }
  }

  trackTrilhaById(index: number, item: ITrilha): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPontosCardeais>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(pontosCardeais: IPontosCardeais): void {
    this.editForm.patchValue({
      id: pontosCardeais.id,
      latitude: pontosCardeais.latitude,
      longitude: pontosCardeais.longitude,
      trilha: pontosCardeais.trilha,
    });

    this.trilhasSharedCollection = this.trilhaService.addTrilhaToCollectionIfMissing(this.trilhasSharedCollection, pontosCardeais.trilha);
  }

  protected loadRelationshipsOptions(): void {
    this.trilhaService
      .query()
      .pipe(map((res: HttpResponse<ITrilha[]>) => res.body ?? []))
      .pipe(map((trilhas: ITrilha[]) => this.trilhaService.addTrilhaToCollectionIfMissing(trilhas, this.editForm.get('trilha')!.value)))
      .subscribe((trilhas: ITrilha[]) => (this.trilhasSharedCollection = trilhas));
  }

  protected createFromForm(): IPontosCardeais {
    return {
      ...new PontosCardeais(),
      id: this.editForm.get(['id'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      trilha: this.editForm.get(['trilha'])!.value,
    };
  }
}
