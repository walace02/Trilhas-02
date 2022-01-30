import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';
import { ISituacoesTrilha, SituacoesTrilha } from '../situacoes-trilha.model';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { CadastroTrilhaService } from 'app/entities/cadastro-trilha/service/cadastro-trilha.service';

import { SituacoesTrilhaUpdateComponent } from './situacoes-trilha-update.component';

describe('SituacoesTrilha Management Update Component', () => {
  let comp: SituacoesTrilhaUpdateComponent;
  let fixture: ComponentFixture<SituacoesTrilhaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let situacoesTrilhaService: SituacoesTrilhaService;
  let cadastroTrilhaService: CadastroTrilhaService;

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
    cadastroTrilhaService = TestBed.inject(CadastroTrilhaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CadastroTrilha query and add missing value', () => {
      const situacoesTrilha: ISituacoesTrilha = { id: 456 };
      const cadastroTrilha: ICadastroTrilha = { id: 72267 };
      situacoesTrilha.cadastroTrilha = cadastroTrilha;

      const cadastroTrilhaCollection: ICadastroTrilha[] = [{ id: 87823 }];
      jest.spyOn(cadastroTrilhaService, 'query').mockReturnValue(of(new HttpResponse({ body: cadastroTrilhaCollection })));
      const additionalCadastroTrilhas = [cadastroTrilha];
      const expectedCollection: ICadastroTrilha[] = [...additionalCadastroTrilhas, ...cadastroTrilhaCollection];
      jest.spyOn(cadastroTrilhaService, 'addCadastroTrilhaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      expect(cadastroTrilhaService.query).toHaveBeenCalled();
      expect(cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing).toHaveBeenCalledWith(
        cadastroTrilhaCollection,
        ...additionalCadastroTrilhas
      );
      expect(comp.cadastroTrilhasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const situacoesTrilha: ISituacoesTrilha = { id: 456 };
      const cadastroTrilha: ICadastroTrilha = { id: 17690 };
      situacoesTrilha.cadastroTrilha = cadastroTrilha;

      activatedRoute.data = of({ situacoesTrilha });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(situacoesTrilha));
      expect(comp.cadastroTrilhasSharedCollection).toContain(cadastroTrilha);
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
    describe('trackCadastroTrilhaById', () => {
      it('Should return tracked CadastroTrilha primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCadastroTrilhaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
