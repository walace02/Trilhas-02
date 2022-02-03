import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPontosTuristicos, PontosTuristicos } from '../pontos-turisticos.model';
import { PontosTuristicosService } from '../service/pontos-turisticos.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { FotografiasService } from 'app/entities/fotografias/service/fotografias.service';

@Component({
  selector: 'jhi-pontos-turisticos-update',
  templateUrl: './pontos-turisticos-update.component.html',
})
export class PontosTuristicosUpdateComponent implements OnInit {
  isSaving = false;

  pontosCardeaisCollection: IPontosCardeais[] = [];
  fotografiasSharedCollection: IFotografias[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
    avaliacao: [],
    tiposPontosTuristicos: [],
    pontosCardeais: [],
    fotografias: [],
  });

  constructor(
    protected pontosTuristicosService: PontosTuristicosService,
    protected pontosCardeaisService: PontosCardeaisService,
    protected fotografiasService: FotografiasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosTuristicos }) => {
      this.updateForm(pontosTuristicos);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pontosTuristicos = this.createFromForm();
    if (pontosTuristicos.id !== undefined) {
      this.subscribeToSaveResponse(this.pontosTuristicosService.update(pontosTuristicos));
    } else {
      this.subscribeToSaveResponse(this.pontosTuristicosService.create(pontosTuristicos));
    }
  }

  trackPontosCardeaisById(index: number, item: IPontosCardeais): number {
    return item.id!;
  }

  trackFotografiasById(index: number, item: IFotografias): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPontosTuristicos>>): void {
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

  protected updateForm(pontosTuristicos: IPontosTuristicos): void {
    this.editForm.patchValue({
      id: pontosTuristicos.id,
      nome: pontosTuristicos.nome,
      descricao: pontosTuristicos.descricao,
      avaliacao: pontosTuristicos.avaliacao,
      tiposPontosTuristicos: pontosTuristicos.tiposPontosTuristicos,
      pontosCardeais: pontosTuristicos.pontosCardeais,
      fotografias: pontosTuristicos.fotografias,
    });

    this.pontosCardeaisCollection = this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(
      this.pontosCardeaisCollection,
      pontosTuristicos.pontosCardeais
    );
    this.fotografiasSharedCollection = this.fotografiasService.addFotografiasToCollectionIfMissing(
      this.fotografiasSharedCollection,
      pontosTuristicos.fotografias
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pontosCardeaisService
      .query({ filter: 'pontosturisticos-is-null' })
      .pipe(map((res: HttpResponse<IPontosCardeais[]>) => res.body ?? []))
      .pipe(
        map((pontosCardeais: IPontosCardeais[]) =>
          this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(pontosCardeais, this.editForm.get('pontosCardeais')!.value)
        )
      )
      .subscribe((pontosCardeais: IPontosCardeais[]) => (this.pontosCardeaisCollection = pontosCardeais));

    this.fotografiasService
      .query()
      .pipe(map((res: HttpResponse<IFotografias[]>) => res.body ?? []))
      .pipe(
        map((fotografias: IFotografias[]) =>
          this.fotografiasService.addFotografiasToCollectionIfMissing(fotografias, this.editForm.get('fotografias')!.value)
        )
      )
      .subscribe((fotografias: IFotografias[]) => (this.fotografiasSharedCollection = fotografias));
  }

  protected createFromForm(): IPontosTuristicos {
    return {
      ...new PontosTuristicos(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      tiposPontosTuristicos: this.editForm.get(['tiposPontosTuristicos'])!.value,
      pontosCardeais: this.editForm.get(['pontosCardeais'])!.value,
      fotografias: this.editForm.get(['fotografias'])!.value,
    };
  }
}
