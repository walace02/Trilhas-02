import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFotografias, Fotografias } from '../fotografias.model';
import { FotografiasService } from '../service/fotografias.service';

@Component({
  selector: 'jhi-fotografias-update',
  templateUrl: './fotografias-update.component.html',
})
export class FotografiasUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
    autor: [],
    avaliacao: [],
  });

  constructor(protected fotografiasService: FotografiasService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fotografias }) => {
      this.updateForm(fotografias);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fotografias = this.createFromForm();
    if (fotografias.id !== undefined) {
      this.subscribeToSaveResponse(this.fotografiasService.update(fotografias));
    } else {
      this.subscribeToSaveResponse(this.fotografiasService.create(fotografias));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFotografias>>): void {
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

  protected updateForm(fotografias: IFotografias): void {
    this.editForm.patchValue({
      id: fotografias.id,
      nome: fotografias.nome,
      descricao: fotografias.descricao,
      autor: fotografias.autor,
      avaliacao: fotografias.avaliacao,
    });
  }

  protected createFromForm(): IFotografias {
    return {
      ...new Fotografias(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      autor: this.editForm.get(['autor'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
    };
  }
}
