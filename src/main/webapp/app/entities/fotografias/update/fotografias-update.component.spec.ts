import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FotografiasService } from '../service/fotografias.service';
import { IFotografias, Fotografias } from '../fotografias.model';

import { FotografiasUpdateComponent } from './fotografias-update.component';

describe('Fotografias Management Update Component', () => {
  let comp: FotografiasUpdateComponent;
  let fixture: ComponentFixture<FotografiasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fotografiasService: FotografiasService;

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

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fotografias: IFotografias = { id: 456 };

      activatedRoute.data = of({ fotografias });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(fotografias));
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
});
