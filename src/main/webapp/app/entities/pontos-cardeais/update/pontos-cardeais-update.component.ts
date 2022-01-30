import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { CadastroTrilhaService } from 'app/entities/cadastro-trilha/service/cadastro-trilha.service';

@Component({
  selector: 'jhi-pontos-cardeais-update',
  templateUrl: './pontos-cardeais-update.component.html',
})
export class PontosCardeaisUpdateComponent implements OnInit {
  isSaving = false;

  cadastroTrilhasSharedCollection: ICadastroTrilha[] = [];

  editForm = this.fb.group({
    id: [],
    latitude: [],
    longitude: [],
    cadastroTrilha: [],
  });

  constructor(
    protected pontosCardeaisService: PontosCardeaisService,
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
      cadastroTrilha: pontosCardeais.cadastroTrilha,
    });

    this.cadastroTrilhasSharedCollection = this.cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing(
      this.cadastroTrilhasSharedCollection,
      pontosCardeais.cadastroTrilha
    );
  }

  protected loadRelationshipsOptions(): void {
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
      cadastroTrilha: this.editForm.get(['cadastroTrilha'])!.value,
    };
  }
}
