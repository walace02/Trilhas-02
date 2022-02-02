import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TrilhaService } from '../service/trilha.service';
import { ITrilha, Trilha } from '../trilha.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { FotografiasService } from 'app/entities/fotografias/service/fotografias.service';

import { TrilhaUpdateComponent } from './trilha-update.component';

describe('Trilha Management Update Component', () => {
  let comp: TrilhaUpdateComponent;
  let fixture: ComponentFixture<TrilhaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let trilhaService: TrilhaService;
  let usuarioService: UsuarioService;
  let fotografiasService: FotografiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TrilhaUpdateComponent],
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
      .overrideTemplate(TrilhaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrilhaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trilhaService = TestBed.inject(TrilhaService);
    usuarioService = TestBed.inject(UsuarioService);
    fotografiasService = TestBed.inject(FotografiasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const trilha: ITrilha = { id: 456 };
      const usuario: IUsuario = { id: 81896 };
      trilha.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 45067 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trilha });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Fotografias query and add missing value', () => {
      const trilha: ITrilha = { id: 456 };
      const fotografias: IFotografias = { id: 47461 };
      trilha.fotografias = fotografias;

      const fotografiasCollection: IFotografias[] = [{ id: 89161 }];
      jest.spyOn(fotografiasService, 'query').mockReturnValue(of(new HttpResponse({ body: fotografiasCollection })));
      const additionalFotografias = [fotografias];
      const expectedCollection: IFotografias[] = [...additionalFotografias, ...fotografiasCollection];
      jest.spyOn(fotografiasService, 'addFotografiasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trilha });
      comp.ngOnInit();

      expect(fotografiasService.query).toHaveBeenCalled();
      expect(fotografiasService.addFotografiasToCollectionIfMissing).toHaveBeenCalledWith(fotografiasCollection, ...additionalFotografias);
      expect(comp.fotografiasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const trilha: ITrilha = { id: 456 };
      const usuario: IUsuario = { id: 84438 };
      trilha.usuario = usuario;
      const fotografias: IFotografias = { id: 78962 };
      trilha.fotografias = fotografias;

      activatedRoute.data = of({ trilha });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(trilha));
      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.fotografiasSharedCollection).toContain(fotografias);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trilha>>();
      const trilha = { id: 123 };
      jest.spyOn(trilhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trilha }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(trilhaService.update).toHaveBeenCalledWith(trilha);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trilha>>();
      const trilha = new Trilha();
      jest.spyOn(trilhaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trilha }));
      saveSubject.complete();

      // THEN
      expect(trilhaService.create).toHaveBeenCalledWith(trilha);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trilha>>();
      const trilha = { id: 123 };
      jest.spyOn(trilhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trilhaService.update).toHaveBeenCalledWith(trilha);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUsuarioById', () => {
      it('Should return tracked Usuario primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUsuarioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackFotografiasById', () => {
      it('Should return tracked Fotografias primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFotografiasById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
