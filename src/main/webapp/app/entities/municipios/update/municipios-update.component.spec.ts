import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MunicipiosService } from '../service/municipios.service';
import { IMunicipios, Municipios } from '../municipios.model';

import { MunicipiosUpdateComponent } from './municipios-update.component';

describe('Municipios Management Update Component', () => {
  let comp: MunicipiosUpdateComponent;
  let fixture: ComponentFixture<MunicipiosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let municipiosService: MunicipiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MunicipiosUpdateComponent],
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
      .overrideTemplate(MunicipiosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MunicipiosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    municipiosService = TestBed.inject(MunicipiosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const municipios: IMunicipios = { id: 456 };

      activatedRoute.data = of({ municipios });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(municipios));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Municipios>>();
      const municipios = { id: 123 };
      jest.spyOn(municipiosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ municipios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: municipios }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(municipiosService.update).toHaveBeenCalledWith(municipios);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Municipios>>();
      const municipios = new Municipios();
      jest.spyOn(municipiosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ municipios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: municipios }));
      saveSubject.complete();

      // THEN
      expect(municipiosService.create).toHaveBeenCalledWith(municipios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Municipios>>();
      const municipios = { id: 123 };
      jest.spyOn(municipiosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ municipios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(municipiosService.update).toHaveBeenCalledWith(municipios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
