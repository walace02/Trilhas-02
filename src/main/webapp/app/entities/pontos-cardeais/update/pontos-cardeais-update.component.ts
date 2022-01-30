import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { IMunicipios } from 'app/entities/municipios/municipios.model';
import { MunicipiosService } from 'app/entities/municipios/service/municipios.service';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { CadastroTrilhaService } from 'app/entities/cadastro-trilha/service/cadastro-trilha.service';

@Component({
  selector: 'jhi-pontos-cardeais-update',
  templateUrl: './pontos-cardeais-update.component.html',
})
export class PontosCardeaisUpdateComponent implements OnInit {
  isSaving = false;

  municipiosCollection: IMunicipios[] = [];
  cadastroTrilhasSharedCollection: ICadastroTrilha[] = [];

  editForm = this.fb.group({
    id: [],
    latitude: [],
    longitude: [],
    municipios: [],
    cadastroTrilha: [],
  });

  constructor(
    protected pontosCardeaisService: PontosCardeaisService,
    protected municipiosService: MunicipiosService,
    protected cadastroTrilhaService: CadastroTrilhaService,
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

  trackMunicipiosById(index: number, item: IMunicipios): number {
    return item.id!;
  }

  trackCadastroTrilhaById(index: number, item: ICadastroTrilha): number {
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
      municipios: pontosCardeais.municipios,
      cadastroTrilha: pontosCardeais.cadastroTrilha,
    });

    this.municipiosCollection = this.municipiosService.addMunicipiosToCollectionIfMissing(
      this.municipiosCollection,
      pontosCardeais.municipios
    );
    this.cadastroTrilhasSharedCollection = this.cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing(
      this.cadastroTrilhasSharedCollection,
      pontosCardeais.cadastroTrilha
    );
  }

  protected loadRelationshipsOptions(): void {
    this.municipiosService
      .query({ filter: 'pontoscardeais-is-null' })
      .pipe(map((res: HttpResponse<IMunicipios[]>) => res.body ?? []))
      .pipe(
        map((municipios: IMunicipios[]) =>
          this.municipiosService.addMunicipiosToCollectionIfMissing(municipios, this.editForm.get('municipios')!.value)
        )
      )
      .subscribe((municipios: IMunicipios[]) => (this.municipiosCollection = municipios));

    this.cadastroTrilhaService
      .query()
      .pipe(map((res: HttpResponse<ICadastroTrilha[]>) => res.body ?? []))
      .pipe(
        map((cadastroTrilhas: ICadastroTrilha[]) =>
          this.cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing(cadastroTrilhas, this.editForm.get('cadastroTrilha')!.value)
        )
      )
      .subscribe((cadastroTrilhas: ICadastroTrilha[]) => (this.cadastroTrilhasSharedCollection = cadastroTrilhas));
  }

  protected createFromForm(): IPontosCardeais {
    return {
      ...new PontosCardeais(),
      id: this.editForm.get(['id'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      municipios: this.editForm.get(['municipios'])!.value,
      cadastroTrilha: this.editForm.get(['cadastroTrilha'])!.value,
    };
  }
}
