import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMunicipios, Municipios } from '../municipios.model';
import { MunicipiosService } from '../service/municipios.service';

@Component({
  selector: 'jhi-municipios-update',
  templateUrl: './municipios-update.component.html',
})
export class MunicipiosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
  });

  constructor(protected municipiosService: MunicipiosService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ municipios }) => {
      this.updateForm(municipios);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const municipios = this.createFromForm();
    if (municipios.id !== undefined) {
      this.subscribeToSaveResponse(this.municipiosService.update(municipios));
    } else {
      this.subscribeToSaveResponse(this.municipiosService.create(municipios));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMunicipios>>): void {
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

  protected updateForm(municipios: IMunicipios): void {
    this.editForm.patchValue({
      id: municipios.id,
      nome: municipios.nome,
      descricao: municipios.descricao,
    });
  }

  protected createFromForm(): IMunicipios {
    return {
      ...new Municipios(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }
}
