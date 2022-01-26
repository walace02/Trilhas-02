import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITrilhas, Trilhas } from '../trilhas.model';
import { TrilhasService } from '../service/trilhas.service';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { SituacoesTrilhaService } from 'app/entities/situacoes-trilha/service/situacoes-trilha.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';

@Component({
  selector: 'jhi-trilhas-update',
  templateUrl: './trilhas-update.component.html',
})
export class TrilhasUpdateComponent implements OnInit {
  isSaving = false;

  situacoesTrilhasCollection: ISituacoesTrilha[] = [];
  pontosCardeaisCollection: IPontosCardeais[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [],
    comprimento: [null, [Validators.required]],
    avaliacao: [],
    situacoesTrilha: [],
    pontosCardeais: [],
  });

  constructor(
    protected trilhasService: TrilhasService,
    protected situacoesTrilhaService: SituacoesTrilhaService,
    protected pontosCardeaisService: PontosCardeaisService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trilhas }) => {
      this.updateForm(trilhas);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trilhas = this.createFromForm();
    if (trilhas.id !== undefined) {
      this.subscribeToSaveResponse(this.trilhasService.update(trilhas));
    } else {
      this.subscribeToSaveResponse(this.trilhasService.create(trilhas));
    }
  }

  trackSituacoesTrilhaById(index: number, item: ISituacoesTrilha): number {
    return item.id!;
  }

  trackPontosCardeaisById(index: number, item: IPontosCardeais): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrilhas>>): void {
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

  protected updateForm(trilhas: ITrilhas): void {
    this.editForm.patchValue({
      id: trilhas.id,
      nome: trilhas.nome,
      descricao: trilhas.descricao,
      comprimento: trilhas.comprimento,
      avaliacao: trilhas.avaliacao,
      situacoesTrilha: trilhas.situacoesTrilha,
      pontosCardeais: trilhas.pontosCardeais,
    });

    this.situacoesTrilhasCollection = this.situacoesTrilhaService.addSituacoesTrilhaToCollectionIfMissing(
      this.situacoesTrilhasCollection,
      trilhas.situacoesTrilha
    );
    this.pontosCardeaisCollection = this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(
      this.pontosCardeaisCollection,
      trilhas.pontosCardeais
    );
  }

  protected loadRelationshipsOptions(): void {
    this.situacoesTrilhaService
      .query({ filter: 'trilhas-is-null' })
      .pipe(map((res: HttpResponse<ISituacoesTrilha[]>) => res.body ?? []))
      .pipe(
        map((situacoesTrilhas: ISituacoesTrilha[]) =>
          this.situacoesTrilhaService.addSituacoesTrilhaToCollectionIfMissing(situacoesTrilhas, this.editForm.get('situacoesTrilha')!.value)
        )
      )
      .subscribe((situacoesTrilhas: ISituacoesTrilha[]) => (this.situacoesTrilhasCollection = situacoesTrilhas));

    this.pontosCardeaisService
      .query({ filter: 'trilhas-is-null' })
      .pipe(map((res: HttpResponse<IPontosCardeais[]>) => res.body ?? []))
      .pipe(
        map((pontosCardeais: IPontosCardeais[]) =>
          this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(pontosCardeais, this.editForm.get('pontosCardeais')!.value)
        )
      )
      .subscribe((pontosCardeais: IPontosCardeais[]) => (this.pontosCardeaisCollection = pontosCardeais));
  }

  protected createFromForm(): ITrilhas {
    return {
      ...new Trilhas(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      comprimento: this.editForm.get(['comprimento'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      situacoesTrilha: this.editForm.get(['situacoesTrilha'])!.value,
      pontosCardeais: this.editForm.get(['pontosCardeais'])!.value,
    };
  }
}
