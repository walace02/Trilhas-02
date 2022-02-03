import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { ITrilha } from 'app/entities/trilha/trilha.model';
import { TrilhaService } from 'app/entities/trilha/service/trilha.service';

import { PontosCardeaisUpdateComponent } from './pontos-cardeais-update.component';

describe('PontosCardeais Management Update Component', () => {
  let comp: PontosCardeaisUpdateComponent;
  let fixture: ComponentFixture<PontosCardeaisUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pontosCardeaisService: PontosCardeaisService;
  let trilhaService: TrilhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PontosCardeaisUpdateComponent],
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
      .overrideTemplate(PontosCardeaisUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PontosCardeaisUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pontosCardeaisService = TestBed.inject(PontosCardeaisService);
    trilhaService = TestBed.inject(TrilhaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Trilha query and add missing value', () => {
      const pontosCardeais: IPontosCardeais = { id: 456 };
      const trilha: ITrilha = { id: 2100 };
      pontosCardeais.trilha = trilha;

      const trilhaCollection: ITrilha[] = [{ id: 25012 }];
      jest.spyOn(trilhaService, 'query').mockReturnValue(of(new HttpResponse({ body: trilhaCollection })));
      const additionalTrilhas = [trilha];
      const expectedCollection: ITrilha[] = [...additionalTrilhas, ...trilhaCollection];
      jest.spyOn(trilhaService, 'addTrilhaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      expect(trilhaService.query).toHaveBeenCalled();
      expect(trilhaService.addTrilhaToCollectionIfMissing).toHaveBeenCalledWith(trilhaCollection, ...additionalTrilhas);
      expect(comp.trilhasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pontosCardeais: IPontosCardeais = { id: 456 };
      const trilha: ITrilha = { id: 70811 };
      pontosCardeais.trilha = trilha;

      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pontosCardeais));
      expect(comp.trilhasSharedCollection).toContain(trilha);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosCardeais>>();
      const pontosCardeais = { id: 123 };
      jest.spyOn(pontosCardeaisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pontosCardeais }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(pontosCardeaisService.update).toHaveBeenCalledWith(pontosCardeais);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosCardeais>>();
      const pontosCardeais = new PontosCardeais();
      jest.spyOn(pontosCardeaisService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pontosCardeais }));
      saveSubject.complete();

      // THEN
      expect(pontosCardeaisService.create).toHaveBeenCalledWith(pontosCardeais);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PontosCardeais>>();
      const pontosCardeais = { id: 123 };
      jest.spyOn(pontosCardeaisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pontosCardeaisService.update).toHaveBeenCalledWith(pontosCardeais);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTrilhaById', () => {
      it('Should return tracked Trilha primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTrilhaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
