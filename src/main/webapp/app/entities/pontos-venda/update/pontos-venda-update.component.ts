import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPontosVenda, PontosVenda } from '../pontos-venda.model';
import { PontosVendaService } from '../service/pontos-venda.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';

@Component({
  selector: 'jhi-pontos-venda-update',
  templateUrl: './pontos-venda-update.component.html',
})
export class PontosVendaUpdateComponent implements OnInit {
  isSaving = false;

  pontosCardeaisCollection: IPontosCardeais[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
    avaliacao: [],
    tiposPontosVenda: [],
    pontosCardeais: [],
  });

  constructor(
    protected pontosVendaService: PontosVendaService,
    protected pontosCardeaisService: PontosCardeaisService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pontosVenda }) => {
      this.updateForm(pontosVenda);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pontosVenda = this.createFromForm();
    if (pontosVenda.id !== undefined) {
      this.subscribeToSaveResponse(this.pontosVendaService.update(pontosVenda));
    } else {
      this.subscribeToSaveResponse(this.pontosVendaService.create(pontosVenda));
    }
  }

  trackPontosCardeaisById(index: number, item: IPontosCardeais): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPontosVenda>>): void {
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

  protected updateForm(pontosVenda: IPontosVenda): void {
    this.editForm.patchValue({
      id: pontosVenda.id,
      nome: pontosVenda.nome,
      descricao: pontosVenda.descricao,
      avaliacao: pontosVenda.avaliacao,
      tiposPontosVenda: pontosVenda.tiposPontosVenda,
      pontosCardeais: pontosVenda.pontosCardeais,
    });

    this.pontosCardeaisCollection = this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(
      this.pontosCardeaisCollection,
      pontosVenda.pontosCardeais
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pontosCardeaisService
      .query({ filter: 'pontosvenda-is-null' })
      .pipe(map((res: HttpResponse<IPontosCardeais[]>) => res.body ?? []))
      .pipe(
        map((pontosCardeais: IPontosCardeais[]) =>
          this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(pontosCardeais, this.editForm.get('pontosCardeais')!.value)
        )
      )
      .subscribe((pontosCardeais: IPontosCardeais[]) => (this.pontosCardeaisCollection = pontosCardeais));
  }

  protected createFromForm(): IPontosVenda {
    return {
      ...new PontosVenda(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      avaliacao: this.editForm.get(['avaliacao'])!.value,
      tiposPontosVenda: this.editForm.get(['tiposPontosVenda'])!.value,
      pontosCardeais: this.editForm.get(['pontosCardeais'])!.value,
    };
  }
}
