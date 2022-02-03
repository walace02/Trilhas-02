import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PontosVendaService } from '../service/pontos-venda.service';
import { IPontosVenda, PontosVenda } from '../pontos-venda.model';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';
import { IFotografias } from 'app/entities/fotografias/fotografias.model';
import { FotografiasService } from 'app/entities/fotografias/service/fotografias.service';

import { PontosVendaUpdateComponent } from './pontos-venda-update.component';

describe('PontosVenda Management Update Component', () => {
  let comp: PontosVendaUpdateComponent;
  let fixture: ComponentFixture<PontosVendaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pontosVendaService: PontosVendaService;
  let pontosCardeaisService: PontosCardeaisService;
  let fotografiasService: FotografiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PontosVendaUpdateComponent],
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
      .overrideTemplate(PontosVendaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PontosVendaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pontosVendaService = TestBed.inject(PontosVendaService);
    pontosCardeaisService = TestBed.inject(PontosCardeaisService);
    fotografiasService = TestBed.inject(FotografiasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call pontosCardeais query and add missing value', () => {
      const pontosVenda: IPontosVenda = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 52024 };
      pontosVenda.pontosCardeais = pontosCardeais;

      const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 70472 }];
      jest.spyOn(pontosCardeaisService, 'query').mockReturnValue(of(new HttpResponse({ body: pontosCardeaisCollection })));
      const expectedCollection: IPontosCardeais[] = [pontosCardeais, ...pontosCardeaisCollection];
      jest.spyOn(pontosCardeaisService, 'addPontosCardeaisToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      expect(pontosCardeaisService.query).toHaveBeenCalled();
      expect(pontosCardeaisService.addPontosCardeaisToCollectionIfMissing).toHaveBeenCalledWith(pontosCardeaisCollection, pontosCardeais);
      expect(comp.pontosCardeaisCollection).toEqual(expectedCollection);
    });

    it('Should call Fotografias query and add missing value', () => {
      const pontosVenda: IPontosVenda = { id: 456 };
      const fotografias: IFotografias = { id: 57477 };
      pontosVenda.fotografias = fotografias;

      const fotografiasCollection: IFotografias[] = [{ id: 19249 }];
      jest.spyOn(fotografiasService, 'query').mockReturnValue(of(new HttpResponse({ body: fotografiasCollection })));
      const additionalFotografias = [fotografias];
      const expectedCollection: IFotografias[] = [...additionalFotografias, ...fotografiasCollection];
      jest.spyOn(fotografiasService, 'addFotografiasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      expect(fotografiasService.query).toHaveBeenCalled();
      expect(fotografiasService.addFotografiasToCollectionIfMissing).toHaveBeenCalledWith(fotografiasCollection, ...additionalFotografias);
      expect(comp.fotografiasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pontosVenda: IPontosVenda = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 65573 };
      pontosVenda.pontosCardeais = pontosCardeais;
      const fotografias: IFotografias = { id: 21110 };
      pontosVenda.fotografias = fotografias;

      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pontosVenda));
      expect(comp.pontosCardeaisCollection).toContain(pontosCardeais);
      expect(comp.fotografiasSharedCollection).toContain(fotografias);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosVenda>>();
      const pontosVenda = { id: 123 };
      jest.spyOn(pontosVendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pontosVenda }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(pontosVendaService.update).toHaveBeenCalledWith(pontosVenda);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosVenda>>();
      const pontosVenda = new PontosVenda();
      jest.spyOn(pontosVendaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pontosVenda }));
      saveSubject.complete();

      // THEN
      expect(pontosVendaService.create).toHaveBeenCalledWith(pontosVenda);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosVenda>>();
      const pontosVenda = { id: 123 };
      jest.spyOn(pontosVendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pontosVendaService.update).toHaveBeenCalledWith(pontosVenda);
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
