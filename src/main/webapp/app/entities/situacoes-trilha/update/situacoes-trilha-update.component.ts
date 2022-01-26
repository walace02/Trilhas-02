import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISituacoesTrilha, SituacoesTrilha } from '../situacoes-trilha.model';
import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';

@Component({
  selector: 'jhi-situacoes-trilha-update',
  templateUrl: './situacoes-trilha-update.component.html',
})
export class SituacoesTrilhaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    situacao: [],
  });

  constructor(
    protected situacoesTrilhaService: SituacoesTrilhaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ situacoesTrilha }) => {
      this.updateForm(situacoesTrilha);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const situacoesTrilha = this.createFromForm();
    if (situacoesTrilha.id !== undefined) {
      this.subscribeToSaveResponse(this.situacoesTrilhaService.update(situacoesTrilha));
    } else {
      this.subscribeToSaveResponse(this.situacoesTrilhaService.create(situacoesTrilha));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISituacoesTrilha>>): void {
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

  protected updateForm(situacoesTrilha: ISituacoesTrilha): void {
    this.editForm.patchValue({
      id: situacoesTrilha.id,
      situacao: situacoesTrilha.situacao,
    });
  }

  protected createFromForm(): ISituacoesTrilha {
    return {
      ...new SituacoesTrilha(),
      id: this.editForm.get(['id'])!.value,
      situacao: this.editForm.get(['situacao'])!.value,
    };
  }
}
