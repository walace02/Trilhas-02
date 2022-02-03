import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PontosTuristicosService } from '../service/pontos-turisticos.service';
import { IPontosTuristicos, PontosTuristicos } from '../pontos-turisticos.model';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { FotografiasService } from 'app/entities/fotografias/service/fotografias.service';

import { PontosTuristicosUpdateComponent } from './pontos-turisticos-update.component';

describe('PontosTuristicos Management Update Component', () => {
  let comp: PontosTuristicosUpdateComponent;
  let fixture: ComponentFixture<PontosTuristicosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pontosTuristicosService: PontosTuristicosService;
  let pontosCardeaisService: PontosCardeaisService;
  let fotografiasService: FotografiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PontosTuristicosUpdateComponent],
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
      .overrideTemplate(PontosTuristicosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PontosTuristicosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pontosTuristicosService = TestBed.inject(PontosTuristicosService);
    pontosCardeaisService = TestBed.inject(PontosCardeaisService);
    fotografiasService = TestBed.inject(FotografiasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call pontosCardeais query and add missing value', () => {
      const pontosTuristicos: IPontosTuristicos = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 66758 };
      pontosTuristicos.pontosCardeais = pontosCardeais;

      const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 77955 }];
      jest.spyOn(pontosCardeaisService, 'query').mockReturnValue(of(new HttpResponse({ body: pontosCardeaisCollection })));
      const expectedCollection: IPontosCardeais[] = [pontosCardeais, ...pontosCardeaisCollection];
      jest.spyOn(pontosCardeaisService, 'addPontosCardeaisToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosTuristicos });
      comp.ngOnInit();

      expect(pontosCardeaisService.query).toHaveBeenCalled();
      expect(pontosCardeaisService.addPontosCardeaisToCollectionIfMissing).toHaveBeenCalledWith(pontosCardeaisCollection, pontosCardeais);
      expect(comp.pontosCardeaisCollection).toEqual(expectedCollection);
    });

    it('Should call Fotografias query and add missing value', () => {
      const pontosTuristicos: IPontosTuristicos = { id: 456 };
      const fotografias: IFotografias = { id: 24987 };
      pontosTuristicos.fotografias = fotografias;

      const fotografiasCollection: IFotografias[] = [{ id: 31610 }];
      jest.spyOn(fotografiasService, 'query').mockReturnValue(of(new HttpResponse({ body: fotografiasCollection })));
      const additionalFotografias = [fotografias];
      const expectedCollection: IFotografias[] = [...additionalFotografias, ...fotografiasCollection];
      jest.spyOn(fotografiasService, 'addFotografiasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosTuristicos });
      comp.ngOnInit();

      expect(fotografiasService.query).toHaveBeenCalled();
      expect(fotografiasService.addFotografiasToCollectionIfMissing).toHaveBeenCalledWith(fotografiasCollection, ...additionalFotografias);
      expect(comp.fotografiasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pontosTuristicos: IPontosTuristicos = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 68253 };
      pontosTuristicos.pontosCardeais = pontosCardeais;
      const fotografias: IFotografias = { id: 49432 };
      pontosTuristicos.fotografias = fotografias;

      activatedRoute.data = of({ pontosTuristicos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pontosTuristicos));
      expect(comp.pontosCardeaisCollection).toContain(pontosCardeais);
      expect(comp.fotografiasSharedCollection).toContain(fotografias);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosTuristicos>>();
      const pontosTuristicos = { id: 123 };
      jest.spyOn(pontosTuristicosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosTuristicos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pontosTuristicos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(pontosTuristicosService.update).toHaveBeenCalledWith(pontosTuristicos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosTuristicos>>();
      const pontosTuristicos = new PontosTuristicos();
      jest.spyOn(pontosTuristicosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosTuristicos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pontosTuristicos }));
      saveSubject.complete();

      // THEN
      expect(pontosTuristicosService.create).toHaveBeenCalledWith(pontosTuristicos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosTuristicos>>();
      const pontosTuristicos = { id: 123 };
      jest.spyOn(pontosTuristicosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosTuristicos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pontosTuristicosService.update).toHaveBeenCalledWith(pontosTuristicos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPontosCardeaisById', () => {
      it('Should return tracked PontosCardeais primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPontosCardeaisById(0, entity);
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
