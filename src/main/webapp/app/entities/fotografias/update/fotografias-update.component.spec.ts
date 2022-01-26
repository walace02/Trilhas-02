import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FotografiasService } from '../service/fotografias.service';
import { IFotografias, Fotografias } from '../fotografias.model';
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';
import { TrilhasService } from 'app/entities/trilhas/service/trilhas.service';
import { IPontosTuristicos } from 'app/entities/pontos-turisticos/pontos-turisticos.model';
import { PontosTuristicosService } from 'app/entities/pontos-turisticos/service/pontos-turisticos.service';
import { IPontosVenda } from 'app/entities/pontos-venda/pontos-venda.model';
import { PontosVendaService } from 'app/entities/pontos-venda/service/pontos-venda.service';

import { FotografiasUpdateComponent } from './fotografias-update.component';

describe('Fotografias Management Update Component', () => {
  let comp: FotografiasUpdateComponent;
  let fixture: ComponentFixture<FotografiasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fotografiasService: FotografiasService;
  let trilhasService: TrilhasService;
  let pontosTuristicosService: PontosTuristicosService;
  let pontosVendaService: PontosVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FotografiasUpdateComponent],
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
      .overrideTemplate(FotografiasUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FotografiasUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fotografiasService = TestBed.inject(FotografiasService);
    trilhasService = TestBed.inject(TrilhasService);
    pontosTuristicosService = TestBed.inject(PontosTuristicosService);
    pontosVendaService = TestBed.inject(PontosVendaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Trilhas query and add missing value', () => {
      const fotografias: IFotografias = { id: 456 };
      const trilhas: ITrilhas = { id: 93145 };
      fotografias.trilhas = trilhas;

      const trilhasCollection: ITrilhas[] = [{ id: 7363 }];
      jest.spyOn(trilhasService, 'query').mockReturnValue(of(new HttpResponse({ body: trilhasCollection })));
      const additionalTrilhas = [trilhas];
      const expectedCollection: ITrilhas[] = [...additionalTrilhas, ...trilhasCollection];
      jest.spyOn(trilhasService, 'addTrilhasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      expect(trilhasService.query).toHaveBeenCalled();
      expect(trilhasService.addTrilhasToCollectionIfMissing).toHaveBeenCalledWith(trilhasCollection, ...additionalTrilhas);
      expect(comp.trilhasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PontosTuristicos query and add missing value', () => {
      const fotografias: IFotografias = { id: 456 };
      const pontosTuristicos: IPontosTuristicos = { id: 21827 };
      fotografias.pontosTuristicos = pontosTuristicos;

      const pontosTuristicosCollection: IPontosTuristicos[] = [{ id: 55277 }];
      jest.spyOn(pontosTuristicosService, 'query').mockReturnValue(of(new HttpResponse({ body: pontosTuristicosCollection })));
      const additionalPontosTuristicos = [pontosTuristicos];
      const expectedCollection: IPontosTuristicos[] = [...additionalPontosTuristicos, ...pontosTuristicosCollection];
      jest.spyOn(pontosTuristicosService, 'addPontosTuristicosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      expect(pontosTuristicosService.query).toHaveBeenCalled();
      expect(pontosTuristicosService.addPontosTuristicosToCollectionIfMissing).toHaveBeenCalledWith(
        pontosTuristicosCollection,
        ...additionalPontosTuristicos
      );
      expect(comp.pontosTuristicosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PontosVenda query and add missing value', () => {
      const fotografias: IFotografias = { id: 456 };
      const pontosVenda: IPontosVenda = { id: 20584 };
      fotografias.pontosVenda = pontosVenda;

      const pontosVendaCollection: IPontosVenda[] = [{ id: 54533 }];
      jest.spyOn(pontosVendaService, 'query').mockReturnValue(of(new HttpResponse({ body: pontosVendaCollection })));
      const additionalPontosVendas = [pontosVenda];
      const expectedCollection: IPontosVenda[] = [...additionalPontosVendas, ...pontosVendaCollection];
      jest.spyOn(pontosVendaService, 'addPontosVendaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      expect(pontosVendaService.query).toHaveBeenCalled();
      expect(pontosVendaService.addPontosVendaToCollectionIfMissing).toHaveBeenCalledWith(pontosVendaCollection, ...additionalPontosVendas);
      expect(comp.pontosVendasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fotografias: IFotografias = { id: 456 };
      const trilhas: ITrilhas = { id: 39046 };
      fotografias.trilhas = trilhas;
      const pontosTuristicos: IPontosTuristicos = { id: 56540 };
      fotografias.pontosTuristicos = pontosTuristicos;
      const pontosVenda: IPontosVenda = { id: 71713 };
      fotografias.pontosVenda = pontosVenda;

      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(fotografias));
      expect(comp.trilhasSharedCollection).toContain(trilhas);
      expect(comp.pontosTuristicosSharedCollection).toContain(pontosTuristicos);
      expect(comp.pontosVendasSharedCollection).toContain(pontosVenda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Fotografias>>();
      const fotografias = { id: 123 };
      jest.spyOn(fotografiasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fotografias }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(fotografiasService.update).toHaveBeenCalledWith(fotografias);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Fotografias>>();
      const fotografias = new Fotografias();
      jest.spyOn(fotografiasService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fotografias }));
      saveSubject.complete();

      // THEN
      expect(fotografiasService.create).toHaveBeenCalledWith(fotografias);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Fotografias>>();
      const fotografias = { id: 123 };
      jest.spyOn(fotografiasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fotografiasService.update).toHaveBeenCalledWith(fotografias);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTrilhasById', () => {
      it('Should return tracked Trilhas primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTrilhasById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPontosTuristicosById', () => {
      it('Should return tracked PontosTuristicos primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPontosTuristicosById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPontosVendaById', () => {
      it('Should return tracked PontosVenda primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPontosVendaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
