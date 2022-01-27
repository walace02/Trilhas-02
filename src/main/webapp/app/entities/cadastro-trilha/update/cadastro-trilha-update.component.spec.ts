import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CadastroTrilhaService } from '../service/cadastro-trilha.service';
import { ICadastroTrilha, CadastroTrilha } from '../cadastro-trilha.model';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { SituacoesTrilhaService } from 'app/entities/situacoes-trilha/service/situacoes-trilha.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { CadastroTrilhaUpdateComponent } from './cadastro-trilha-update.component';

describe('CadastroTrilha Management Update Component', () => {
  let comp: CadastroTrilhaUpdateComponent;
  let fixture: ComponentFixture<CadastroTrilhaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cadastroTrilhaService: CadastroTrilhaService;
  let situacoesTrilhaService: SituacoesTrilhaService;
  let pontosCardeaisService: PontosCardeaisService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CadastroTrilhaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CadastroTrilhaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CadastroTrilhaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cadastroTrilhaService = TestBed.inject(CadastroTrilhaService);
    situacoesTrilhaService = TestBed.inject(SituacoesTrilhaService);
    pontosCardeaisService = TestBed.inject(PontosCardeaisService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call situacoesTrilha query and add missing value', () => {
      const cadastroTrilha: ICadastroTrilha = { id: 456 };
      const situacoesTrilha: ISituacoesTrilha = { id: 65331 };
      cadastroTrilha.situacoesTrilha = situacoesTrilha;

      const situacoesTrilhaCollection: ISituacoesTrilha[] = [{ id: 1455 }];
      jest.spyOn(situacoesTrilhaService, 'query').mockReturnValue(of(new HttpResponse({ body: situacoesTrilhaCollection })));
      const expectedCollection: ISituacoesTrilha[] = [situacoesTrilha, ...situacoesTrilhaCollection];
      jest.spyOn(situacoesTrilhaService, 'addSituacoesTrilhaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      expect(situacoesTrilhaService.query).toHaveBeenCalled();
      expect(situacoesTrilhaService.addSituacoesTrilhaToCollectionIfMissing).toHaveBeenCalledWith(
        situacoesTrilhaCollection,
        situacoesTrilha
      );
      expect(comp.situacoesTrilhasCollection).toEqual(expectedCollection);
    });

    it('Should call pontosCardeais query and add missing value', () => {
      const cadastroTrilha: ICadastroTrilha = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 70683 };
      cadastroTrilha.pontosCardeais = pontosCardeais;

      const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 45983 }];
      jest.spyOn(pontosCardeaisService, 'query').mockReturnValue(of(new HttpResponse({ body: pontosCardeaisCollection })));
      const expectedCollection: IPontosCardeais[] = [pontosCardeais, ...pontosCardeaisCollection];
      jest.spyOn(pontosCardeaisService, 'addPontosCardeaisToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      expect(pontosCardeaisService.query).toHaveBeenCalled();
      expect(pontosCardeaisService.addPontosCardeaisToCollectionIfMissing).toHaveBeenCalledWith(pontosCardeaisCollection, pontosCardeais);
      expect(comp.pontosCardeaisCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const cadastroTrilha: ICadastroTrilha = { id: 456 };
      const usuario: IUsuario = { id: 68187 };
      cadastroTrilha.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 34701 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cadastroTrilha: ICadastroTrilha = { id: 456 };
      const situacoesTrilha: ISituacoesTrilha = { id: 66411 };
      cadastroTrilha.situacoesTrilha = situacoesTrilha;
      const pontosCardeais: IPontosCardeais = { id: 94844 };
      cadastroTrilha.pontosCardeais = pontosCardeais;
      const usuario: IUsuario = { id: 86433 };
      cadastroTrilha.usuario = usuario;

      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(cadastroTrilha));
      expect(comp.situacoesTrilhasCollection).toContain(situacoesTrilha);
      expect(comp.pontosCardeaisCollection).toContain(pontosCardeais);
      expect(comp.usuariosSharedCollection).toContain(usuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CadastroTrilha>>();
      const cadastroTrilha = { id: 123 };
      jest.spyOn(cadastroTrilhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadastroTrilha }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cadastroTrilhaService.update).toHaveBeenCalledWith(cadastroTrilha);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CadastroTrilha>>();
      const cadastroTrilha = new CadastroTrilha();
      jest.spyOn(cadastroTrilhaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadastroTrilha }));
      saveSubject.complete();

      // THEN
      expect(cadastroTrilhaService.create).toHaveBeenCalledWith(cadastroTrilha);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CadastroTrilha>>();
      const cadastroTrilha = { id: 123 };
      jest.spyOn(cadastroTrilhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadastroTrilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cadastroTrilhaService.update).toHaveBeenCalledWith(cadastroTrilha);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSituacoesTrilhaById', () => {
      it('Should return tracked SituacoesTrilha primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSituacoesTrilhaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPontosCardeaisById', () => {
      it('Should return tracked PontosCardeais primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPontosCardeaisById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUsuarioById', () => {
      it('Should return tracked Usuario primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUsuarioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
