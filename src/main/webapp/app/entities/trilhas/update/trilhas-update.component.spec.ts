import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TrilhasService } from '../service/trilhas.service';
import { ITrilhas, Trilhas } from '../trilhas.model';
import { ISituacoesTrilha } from 'app/entities/situacoes-trilha/situacoes-trilha.model';
import { SituacoesTrilhaService } from 'app/entities/situacoes-trilha/service/situacoes-trilha.service';
import { IPontosCardeais } from 'app/entities/pontos-cardeais/pontos-cardeais.model';
import { PontosCardeaisService } from 'app/entities/pontos-cardeais/service/pontos-cardeais.service';

import { TrilhasUpdateComponent } from './trilhas-update.component';

describe('Trilhas Management Update Component', () => {
  let comp: TrilhasUpdateComponent;
  let fixture: ComponentFixture<TrilhasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let trilhasService: TrilhasService;
  let situacoesTrilhaService: SituacoesTrilhaService;
  let pontosCardeaisService: PontosCardeaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TrilhasUpdateComponent],
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
      .overrideTemplate(TrilhasUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrilhasUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trilhasService = TestBed.inject(TrilhasService);
    situacoesTrilhaService = TestBed.inject(SituacoesTrilhaService);
    pontosCardeaisService = TestBed.inject(PontosCardeaisService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call situacoesTrilha query and add missing value', () => {
      const trilhas: ITrilhas = { id: 456 };
      const situacoesTrilha: ISituacoesTrilha = { id: 40979 };
      trilhas.situacoesTrilha = situacoesTrilha;

      const situacoesTrilhaCollection: ISituacoesTrilha[] = [{ id: 68692 }];
      jest.spyOn(situacoesTrilhaService, 'query').mockReturnValue(of(new HttpResponse({ body: situacoesTrilhaCollection })));
      const expectedCollection: ISituacoesTrilha[] = [situacoesTrilha, ...situacoesTrilhaCollection];
      jest.spyOn(situacoesTrilhaService, 'addSituacoesTrilhaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trilhas });
      comp.ngOnInit();

      expect(situacoesTrilhaService.query).toHaveBeenCalled();
      expect(situacoesTrilhaService.addSituacoesTrilhaToCollectionIfMissing).toHaveBeenCalledWith(
        situacoesTrilhaCollection,
        situacoesTrilha
      );
      expect(comp.situacoesTrilhasCollection).toEqual(expectedCollection);
    });

    it('Should call pontosCardeais query and add missing value', () => {
      const trilhas: ITrilhas = { id: 456 };
      const pontosCardeais: IPontosCardeais = { id: 88714 };
      trilhas.pontosCardeais = pontosCardeais;

      const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 27900 }];
      jest.spyOn(pontosCardeaisService, 'query').mockReturnValue(of(new HttpResponse({ body: pontosCardeaisCollection })));
      const expectedCollection: IPontosCardeais[] = [pontosCardeais, ...pontosCardeaisCollection];
      jest.spyOn(pontosCardeaisService, 'addPontosCardeaisToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trilhas });
      comp.ngOnInit();

      expect(pontosCardeaisService.query).toHaveBeenCalled();
      expect(pontosCardeaisService.addPontosCardeaisToCollectionIfMissing).toHaveBeenCalledWith(pontosCardeaisCollection, pontosCardeais);
      expect(comp.pontosCardeaisCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const trilhas: ITrilhas = { id: 456 };
      const situacoesTrilha: ISituacoesTrilha = { id: 46685 };
      trilhas.situacoesTrilha = situacoesTrilha;
      const pontosCardeais: IPontosCardeais = { id: 2849 };
      trilhas.pontosCardeais = pontosCardeais;

      activatedRoute.data = of({ trilhas });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(trilhas));
      expect(comp.situacoesTrilhasCollection).toContain(situacoesTrilha);
      expect(comp.pontosCardeaisCollection).toContain(pontosCardeais);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trilhas>>();
      const trilhas = { id: 123 };
      jest.spyOn(trilhasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trilhas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trilhas }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(trilhasService.update).toHaveBeenCalledWith(trilhas);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trilhas>>();
      const trilhas = new Trilhas();
      jest.spyOn(trilhasService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trilhas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trilhas }));
      saveSubject.complete();

      // THEN
      expect(trilhasService.create).toHaveBeenCalledWith(trilhas);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trilhas>>();
      const trilhas = { id: 123 };
      jest.spyOn(trilhasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trilhas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trilhasService.update).toHaveBeenCalledWith(trilhas);
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
  });
});
