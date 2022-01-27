import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IFotografias, Fotografias } from '../fotografias.model';
import { FotografiasService } from '../service/fotografias.service';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { CadastroTrilhaService } from 'app/entities/cadastro-trilha/service/cadastro-trilha.service';
import { IPontosTuristicos } from 'app/entities/pontos-turisticos/pontos-turisticos.model';
import { PontosTuristicosService } from 'app/entities/pontos-turisticos/service/pontos-turisticos.service';
import { IPontosVenda } from 'app/entities/pontos-venda/pontos-venda.model';
import { PontosVendaService } from 'app/entities/pontos-venda/service/pontos-venda.service';

@Component({
  selector: 'jhi-fotografias-update',
  templateUrl: './fotografias-update.component.html',
})
export class FotografiasUpdateComponent implements OnInit {
  isSaving = false;

  cadastroTrilhasSharedCollection: ICadastroTrilha[] = [];
  pontosTuristicosSharedCollection: IPontosTuristicos[] = [];
  pontosVendasSharedCollection: IPontosVenda[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
    autor: [],
    avaliacao: [],
    cadastroTrilha: [],
    pontosTuristicos: [],
    pontosVenda: [],
  });

  constructor(
    protected fotografiasService: FotografiasService,
    protected cadastroTrilhaService: CadastroTrilhaService,
    protected pontosTuristicosService: PontosTuristicosService,
    protected pontosVendaService: PontosVendaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fotografias }) => {
      this.updateForm(fotografias);

      this.loadRelationshipsOptions();
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

  trackCadastroTrilhaById(index: number, item: ICadastroTrilha): number {
    return item.id!;
  }

  trackPontosTuristicosById(index: number, item: IPontosTuristicos): number {
    return item.id!;
  }

  trackPontosVendaById(index: number, item: IPontosVenda): number {
    return item.id!;
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
      cadastroTrilha: fotografias.cadastroTrilha,
      pontosTuristicos: fotografias.pontosTuristicos,
      pontosVenda: fotografias.pontosVenda,
    });

    this.cadastroTrilhasSharedCollection = this.cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing(
      this.cadastroTrilhasSharedCollection,
      fotografias.cadastroTrilha
    );
    this.pontosTuristicosSharedCollection = this.pontosTuristicosService.addPontosTuristicosToCollectionIfMissing(
      this.pontosTuristicosSharedCollection,
      fotografias.pontosTuristicos
    );
    this.pontosVendasSharedCollection = this.pontosVendaService.addPontosVendaToCollectionIfMissing(
      this.pontosVendasSharedCollection,
      fotografias.pontosVenda
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

    this.pontosTuristicosService
      .query()
      .pipe(map((res: HttpResponse<IPontosTuristicos[]>) => res.body ?? []))
      .pipe(
        map((pontosTuristicos: IPontosTuristicos[]) =>
          this.pontosTuristicosService.addPontosTuristicosToCollectionIfMissing(
            pontosTuristicos,
            this.editForm.get('pontosTuristicos')!.value
          )
        )
      )
      .subscribe((pontosTuristicos: IPontosTuristicos[]) => (this.pontosTuristicosSharedCollection = pontosTuristicos));

    this.pontosVendaService
      .query()
      .pipe(map((res: HttpResponse<IPontosVenda[]>) => res.body ?? []))
      .pipe(
        map((pontosVendas: IPontosVenda[]) =>
          this.pontosVendaService.addPontosVendaToCollectionIfMissing(pontosVendas, this.editForm.get('pontosVenda')!.value)
        )
      )
      .subscribe((pontosVendas: IPontosVenda[]) => (this.pontosVendasSharedCollection = pontosVendas));
  }

  protected createFromForm(): IFotografias {
    return {
      ...new Fotografias(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      autor: this.editForm.get(['autor'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      cadastroTrilha: this.editForm.get(['cadastroTrilha'])!.value,
      pontosTuristicos: this.editForm.get(['pontosTuristicos'])!.value,
      pontosVenda: this.editForm.get(['pontosVenda'])!.value,
    };
  }
}
