import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PontosTuristicosDetailComponent } from './pontos-turisticos-detail.component';

describe('PontosTuristicos Management Detail Component', () => {
  let comp: PontosTuristicosDetailComponent;
  let fixture: ComponentFixture<PontosTuristicosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PontosTuristicosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pontosTuristicos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PontosTuristicosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PontosTuristicosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pontosTuristicos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pontosTuristicos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
