import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PontosCardeaisDetailComponent } from './pontos-cardeais-detail.component';

describe('PontosCardeais Management Detail Component', () => {
  let comp: PontosCardeaisDetailComponent;
  let fixture: ComponentFixture<PontosCardeaisDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PontosCardeaisDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pontosCardeais: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PontosCardeaisDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PontosCardeaisDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pontosCardeais on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pontosCardeais).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
