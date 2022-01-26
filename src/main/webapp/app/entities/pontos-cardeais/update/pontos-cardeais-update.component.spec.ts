import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PontosCardeaisService } from '../service/pontos-cardeais.service';
import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { IMunicipios } from 'app/entities/municipios/municipios.model';
import { MunicipiosService } from 'app/entities/municipios/service/municipios.service';

import { PontosCardeaisUpdateComponent } from './pontos-cardeais-update.component';

describe('PontosCardeais Management Update Component', () => {
  let comp: PontosCardeaisUpdateComponent;
  let fixture: ComponentFixture<PontosCardeaisUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pontosCardeaisService: PontosCardeaisService;
  let municipiosService: MunicipiosService;

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
    municipiosService = TestBed.inject(MunicipiosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call municipios query and add missing value', () => {
      const pontosCardeais: IPontosCardeais = { id: 456 };
      const municipios: IMunicipios = { id: 11574 };
      pontosCardeais.municipios = municipios;

      const municipiosCollection: IMunicipios[] = [{ id: 63751 }];
      jest.spyOn(municipiosService, 'query').mockReturnValue(of(new HttpResponse({ body: municipiosCollection })));
      const expectedCollection: IMunicipios[] = [municipios, ...municipiosCollection];
      jest.spyOn(municipiosService, 'addMunicipiosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      expect(municipiosService.query).toHaveBeenCalled();
      expect(municipiosService.addMunicipiosToCollectionIfMissing).toHaveBeenCalledWith(municipiosCollection, municipios);
      expect(comp.municipiosCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pontosCardeais: IPontosCardeais = { id: 456 };
      const municipios: IMunicipios = { id: 56092 };
      pontosCardeais.municipios = municipios;

      activatedRoute.data = of({ pontosCardeais });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pontosCardeais));
      expect(comp.municipiosCollection).toContain(municipios);
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
    describe('trackMunicipiosById', () => {
      it('Should return tracked Municipios primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMunicipiosById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
