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
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { CadastroTrilhaService } from 'app/entities/cadastro-trilha/service/cadastro-trilha.service';

@Component({
  selector: 'jhi-pontos-turisticos-update',
  templateUrl: './pontos-turisticos-update.component.html',
})
export class PontosTuristicosUpdateComponent implements OnInit {
  isSaving = false;

  pontosCardeaisCollection: IPontosCardeais[] = [];
  cadastroTrilhasSharedCollection: ICadastroTrilha[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
    avaliacao: [],
    tiposPontosTuristicos: [],
    pontosCardeais: [],
    cadastroTrilha: [],
  });

  constructor(
    protected pontosTuristicosService: PontosTuristicosService,
    protected pontosCardeaisService: PontosCardeaisService,
    protected cadastroTrilhaService: CadastroTrilhaService,
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

  trackCadastroTrilhaById(index: number, item: ICadastroTrilha): number {
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
      cadastroTrilha: pontosTuristicos.cadastroTrilha,
    });

    this.pontosCardeaisCollection = this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(
      this.pontosCardeaisCollection,
      pontosTuristicos.pontosCardeais
    );
    this.cadastroTrilhasSharedCollection = this.cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing(
      this.cadastroTrilhasSharedCollection,
      pontosTuristicos.cadastroTrilha
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

  protected createFromForm(): IPontosTuristicos {
    return {
      ...new PontosTuristicos(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      tiposPontosTuristicos: this.editForm.get(['tiposPontosTuristicos'])!.value,
      pontosCardeais: this.editForm.get(['pontosCardeais'])!.value,
      cadastroTrilha: this.editForm.get(['cadastroTrilha'])!.value,
    };
  }
}
