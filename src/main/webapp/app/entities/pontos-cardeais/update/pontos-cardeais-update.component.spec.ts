import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { ICadastroTrilha } from 'app/entities/cadastro-trilha/cadastro-trilha.model';
import { CadastroTrilhaService } from 'app/entities/cadastro-trilha/service/cadastro-trilha.service';

import { PontosCardeaisUpdateComponent } from './pontos-cardeais-update.component';

describe('PontosCardeais Management Update Component', () => {
  let comp: PontosCardeaisUpdateComponent;
  let fixture: ComponentFixture<PontosCardeaisUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pontosCardeaisService: PontosCardeaisService;
  let cadastroTrilhaService: CadastroTrilhaService;

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
    cadastroTrilhaService = TestBed.inject(CadastroTrilhaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CadastroTrilha query and add missing value', () => {
      const pontosCardeais: IPontosCardeais = { id: 456 };
      const cadastroTrilha: ICadastroTrilha = { id: 23669 };
      pontosCardeais.cadastroTrilha = cadastroTrilha;

      const cadastroTrilhaCollection: ICadastroTrilha[] = [{ id: 34481 }];
      jest.spyOn(cadastroTrilhaService, 'query').mockReturnValue(of(new HttpResponse({ body: cadastroTrilhaCollection })));
      const additionalCadastroTrilhas = [cadastroTrilha];
      const expectedCollection: ICadastroTrilha[] = [...additionalCadastroTrilhas, ...cadastroTrilhaCollection];
      jest.spyOn(cadastroTrilhaService, 'addCadastroTrilhaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      expect(cadastroTrilhaService.query).toHaveBeenCalled();
      expect(cadastroTrilhaService.addCadastroTrilhaToCollectionIfMissing).toHaveBeenCalledWith(
        cadastroTrilhaCollection,
        ...additionalCadastroTrilhas
      );
      expect(comp.cadastroTrilhasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pontosCardeais: IPontosCardeais = { id: 456 };
      const cadastroTrilha: ICadastroTrilha = { id: 58896 };
      pontosCardeais.cadastroTrilha = cadastroTrilha;

      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pontosCardeais));
      expect(comp.cadastroTrilhasSharedCollection).toContain(cadastroTrilha);
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
    describe('trackCadastroTrilhaById', () => {
      it('Should return tracked CadastroTrilha primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCadastroTrilhaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
