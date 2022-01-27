import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICadastroTrilha, CadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { SituacoesTrilhaService } from 'app/entities/situacoes-trilha/service/situacoes-trilha.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-cadastro-trilha-update',
  templateUrl: './cadastro-trilha-update.component.html',
})
export class CadastroTrilhaUpdateComponent implements OnInit {
  isSaving = false;

  situacoesTrilhasCollection: ISituacoesTrilha[] = [];
  pontosCardeaisCollection: IPontosCardeais[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [],
    comprimento: [null, [Validators.required]],
    dataHora: [],
    situacoesTrilha: [],
    pontosCardeais: [],
    usuario: [],
  });

  constructor(
    protected cadastroTrilhaService: CadastroTrilhaService,
    protected situacoesTrilhaService: SituacoesTrilhaService,
    protected pontosCardeaisService: PontosCardeaisService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadastroTrilha }) => {
      this.updateForm(cadastroTrilha);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cadastroTrilha = this.createFromForm();
    if (cadastroTrilha.id !== undefined) {
      this.subscribeToSaveResponse(this.cadastroTrilhaService.update(cadastroTrilha));
    } else {
      this.subscribeToSaveResponse(this.cadastroTrilhaService.create(cadastroTrilha));
    }
  }

  trackSituacoesTrilhaById(index: number, item: ISituacoesTrilha): number {
    return item.id!;
  }

  trackPontosCardeaisById(index: number, item: IPontosCardeais): number {
    return item.id!;
  }

  trackUsuarioById(index: number, item: IUsuario): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICadastroTrilha>>): void {
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

  protected updateForm(cadastroTrilha: ICadastroTrilha): void {
    this.editForm.patchValue({
      id: cadastroTrilha.id,
      nome: cadastroTrilha.nome,
      descricao: cadastroTrilha.descricao,
      comprimento: cadastroTrilha.comprimento,
      dataHora: cadastroTrilha.dataHora,
      situacoesTrilha: cadastroTrilha.situacoesTrilha,
      pontosCardeais: cadastroTrilha.pontosCardeais,
      usuario: cadastroTrilha.usuario,
    });

    this.situacoesTrilhasCollection = this.situacoesTrilhaService.addSituacoesTrilhaToCollectionIfMissing(
      this.situacoesTrilhasCollection,
      cadastroTrilha.situacoesTrilha
    );
    this.pontosCardeaisCollection = this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(
      this.pontosCardeaisCollection,
      cadastroTrilha.pontosCardeais
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(
      this.usuariosSharedCollection,
      cadastroTrilha.usuario
    );
  }

  protected loadRelationshipsOptions(): void {
    this.situacoesTrilhaService
      .query({ filter: 'cadastrotrilha-is-null' })
      .pipe(map((res: HttpResponse<ISituacoesTrilha[]>) => res.body ?? []))
      .pipe(
        map((situacoesTrilhas: ISituacoesTrilha[]) =>
          this.situacoesTrilhaService.addSituacoesTrilhaToCollectionIfMissing(situacoesTrilhas, this.editForm.get('situacoesTrilha')!.value)
        )
      )
      .subscribe((situacoesTrilhas: ISituacoesTrilha[]) => (this.situacoesTrilhasCollection = situacoesTrilhas));

    this.pontosCardeaisService
      .query({ filter: 'cadastrotrilha-is-null' })
      .pipe(map((res: HttpResponse<IPontosCardeais[]>) => res.body ?? []))
      .pipe(
        map((pontosCardeais: IPontosCardeais[]) =>
          this.pontosCardeaisService.addPontosCardeaisToCollectionIfMissing(pontosCardeais, this.editForm.get('pontosCardeais')!.value)
        )
      )
      .subscribe((pontosCardeais: IPontosCardeais[]) => (this.pontosCardeaisCollection = pontosCardeais));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuario')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): ICadastroTrilha {
    return {
      ...new CadastroTrilha(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      comprimento: this.editForm.get(['comprimento'])!.value,
      dataHora: this.editForm.get(['dataHora'])!.value,
      situacoesTrilha: this.editForm.get(['situacoesTrilha'])!.value,
      pontosCardeais: this.editForm.get(['pontosCardeais'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }
}
