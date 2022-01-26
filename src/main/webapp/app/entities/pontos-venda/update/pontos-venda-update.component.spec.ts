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
import { ITrilhas } from 'app/entities/trilhas/trilhas.model';
import { TrilhasService } from 'app/entities/trilhas/service/trilhas.service';

import { PontosVendaUpdateComponent } from './pontos-venda-update.component';

describe('PontosVenda Management Update Component', () => {
  let comp: PontosVendaUpdateComponent;
  let fixture: ComponentFixture<PontosVendaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pontosVendaService: PontosVendaService;
  let pontosCardeaisService: PontosCardeaisService;
  let trilhasService: TrilhasService;

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
    trilhasService = TestBed.inject(TrilhasService);

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

    it('Should call Trilhas query and add missing value', () => {
      const pontosVenda: IPontosVenda = { id: 456 };
      const trilhas: ITrilhas = { id: 44993 };
      pontosVenda.trilhas = trilhas;

      const trilhasCollection: ITrilhas[] = [{ id: 73773 }];
      jest.spyOn(trilhasService, 'query').mockReturnValue(of(new HttpResponse({ body: trilhasCollection })));
      const additionalTrilhas = [trilhas];
      const expectedCollection: ITrilhas[] = [...additionalTrilhas, ...trilhasCollection];
      jest.spyOn(trilhasService, 'addTrilhasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      expect(trilhasService.query).toHaveBeenCalled();
      expect(trilhasService.addTrilhasToCollectionIfMissing).toHaveBeenCalledWith(trilhasCollection, ...additionalTrilhas);
      expect(comp.trilhasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pontosVenda: IPontosVenda = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 65573 };
      pontosVenda.pontosCardeais = pontosCardeais;
      const trilhas: ITrilhas = { id: 52471 };
      pontosVenda.trilhas = trilhas;

      activatedRoute.data = of({ pontosVenda });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pontosVenda));
      expect(comp.pontosCardeaisCollection).toContain(pontosCardeais);
      expect(comp.trilhasSharedCollection).toContain(trilhas);
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

    describe('trackTrilhasById', () => {
      it('Should return tracked Trilhas primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTrilhasById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
