import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PontosVendaDetailComponent } from './pontos-venda-detail.component';

describe('PontosVenda Management Detail Component', () => {
  let comp: PontosVendaDetailComponent;
  let fixture: ComponentFixture<PontosVendaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PontosVendaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pontosVenda: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PontosVendaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PontosVendaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pontosVenda on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pontosVenda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
