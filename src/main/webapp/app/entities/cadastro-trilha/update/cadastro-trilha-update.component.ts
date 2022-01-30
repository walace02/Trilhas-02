import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICadastroTrilha, CadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-cadastro-trilha-update',
  templateUrl: './cadastro-trilha-update.component.html',
})
export class CadastroTrilhaUpdateComponent implements OnInit {
  isSaving = false;

  usuariosSharedCollection: IUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    nomeTrilha: [null, [Validators.required]],
    nomeMunicipio: [null, [Validators.required]],
    descricao: [],
    comprimento: [null, [Validators.required]],
    dataHora: [],
    usuario: [],
  });

  constructor(
    protected cadastroTrilhaService: CadastroTrilhaService,
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
      nomeTrilha: cadastroTrilha.nomeTrilha,
      nomeMunicipio: cadastroTrilha.nomeMunicipio,
      descricao: cadastroTrilha.descricao,
      comprimento: cadastroTrilha.comprimento,
      dataHora: cadastroTrilha.dataHora,
      usuario: cadastroTrilha.usuario,
    });

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(
      this.usuariosSharedCollection,
      cadastroTrilha.usuario
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
  }

  protected createFromForm(): ICadastroTrilha {
    return {
      ...new CadastroTrilha(),
      id: this.editForm.get(['id'])!.value,
      nomeTrilha: this.editForm.get(['nomeTrilha'])!.value,
      nomeMunicipio: this.editForm.get(['nomeMunicipio'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      comprimento: this.editForm.get(['comprimento'])!.value,
      dataHora: this.editForm.get(['dataHora'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }
}
