import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITrilha, Trilha } from '../trilha.model';
import { TrilhaService } from '../service/trilha.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { FotografiasService } from 'app/entities/fotografias/service/fotografias.service';

@Component({
  selector: 'jhi-trilha-update',
  templateUrl: './trilha-update.component.html',
})
export class TrilhaUpdateComponent implements OnInit {
  isSaving = false;

  usuariosSharedCollection: IUsuario[] = [];
  fotografiasSharedCollection: IFotografias[] = [];

  editForm = this.fb.group({
    id: [],
    nomeTrilha: [null, [Validators.required]],
    nomeMunicipio: [null, [Validators.required]],
    descricao: [],
    comprimento: [null, [Validators.required]],
    dataHora: [],
    usuario: [],
    fotografias: [],
  });

  constructor(
    protected trilhaService: TrilhaService,
    protected usuarioService: UsuarioService,
    protected fotografiasService: FotografiasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trilha }) => {
      this.updateForm(trilha);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trilha = this.createFromForm();
    if (trilha.id !== undefined) {
      this.subscribeToSaveResponse(this.trilhaService.update(trilha));
    } else {
      this.subscribeToSaveResponse(this.trilhaService.create(trilha));
    }
  }

  trackUsuarioById(index: number, item: IUsuario): number {
    return item.id!;
  }

  trackFotografiasById(index: number, item: IFotografias): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrilha>>): void {
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

  protected updateForm(trilha: ITrilha): void {
    this.editForm.patchValue({
      id: trilha.id,
      nomeTrilha: trilha.nomeTrilha,
      nomeMunicipio: trilha.nomeMunicipio,
      descricao: trilha.descricao,
      comprimento: trilha.comprimento,
      dataHora: trilha.dataHora,
      usuario: trilha.usuario,
      fotografias: trilha.fotografias,
    });

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(this.usuariosSharedCollection, trilha.usuario);
    this.fotografiasSharedCollection = this.fotografiasService.addFotografiasToCollectionIfMissing(
      this.fotografiasSharedCollection,
      trilha.fotografias
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuario')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

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

  protected createFromForm(): ITrilha {
    return {
      ...new Trilha(),
      id: this.editForm.get(['id'])!.value,
      nomeTrilha: this.editForm.get(['nomeTrilha'])!.value,
      nomeMunicipio: this.editForm.get(['nomeMunicipio'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      comprimento: this.editForm.get(['comprimento'])!.value,
      dataHora: this.editForm.get(['dataHora'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      fotografias: this.editForm.get(['fotografias'])!.value,
    };
  }
}
