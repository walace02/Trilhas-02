import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';
import { ISituacoesTrilha, SituacoesTrilha } from '../situacoes-trilha.model';
import { ITrilha } from 'app/entities/trilha/trilha.model';
import { TrilhaService } from 'app/entities/trilha/service/trilha.service';

import { SituacoesTrilhaUpdateComponent } from './situacoes-trilha-update.component';

describe('SituacoesTrilha Management Update Component', () => {
  let comp: SituacoesTrilhaUpdateComponent;
  let fixture: ComponentFixture<SituacoesTrilhaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let situacoesTrilhaService: SituacoesTrilhaService;
  let trilhaService: TrilhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SituacoesTrilhaUpdateComponent],
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
      .overrideTemplate(SituacoesTrilhaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SituacoesTrilhaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    situacoesTrilhaService = TestBed.inject(SituacoesTrilhaService);
    trilhaService = TestBed.inject(TrilhaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Trilha query and add missing value', () => {
      const situacoesTrilha: ISituacoesTrilha = { id: 456 };
      const trilha: ITrilha = { id: 75321 };
      situacoesTrilha.trilha = trilha;

      const trilhaCollection: ITrilha[] = [{ id: 2437 }];
      jest.spyOn(trilhaService, 'query').mockReturnValue(of(new HttpResponse({ body: trilhaCollection })));
      const additionalTrilhas = [trilha];
      const expectedCollection: ITrilha[] = [...additionalTrilhas, ...trilhaCollection];
      jest.spyOn(trilhaService, 'addTrilhaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      expect(trilhaService.query).toHaveBeenCalled();
      expect(trilhaService.addTrilhaToCollectionIfMissing).toHaveBeenCalledWith(trilhaCollection, ...additionalTrilhas);
      expect(comp.trilhasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const situacoesTrilha: ISituacoesTrilha = { id: 456 };
      const trilha: ITrilha = { id: 79656 };
      situacoesTrilha.trilha = trilha;

      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(situacoesTrilha));
      expect(comp.trilhasSharedCollection).toContain(trilha);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SituacoesTrilha>>();
      const situacoesTrilha = { id: 123 };
      jest.spyOn(situacoesTrilhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: situacoesTrilha }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(situacoesTrilhaService.update).toHaveBeenCalledWith(situacoesTrilha);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SituacoesTrilha>>();
      const situacoesTrilha = new SituacoesTrilha();
      jest.spyOn(situacoesTrilhaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: situacoesTrilha }));
      saveSubject.complete();

      // THEN
      expect(situacoesTrilhaService.create).toHaveBeenCalledWith(situacoesTrilha);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SituacoesTrilha>>();
      const situacoesTrilha = { id: 123 };
      jest.spyOn(situacoesTrilhaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(situacoesTrilhaService.update).toHaveBeenCalledWith(situacoesTrilha);
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
