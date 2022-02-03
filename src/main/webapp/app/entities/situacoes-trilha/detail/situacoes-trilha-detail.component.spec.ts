import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SituacoesTrilhaDetailComponent } from './situacoes-trilha-detail.component';

describe('SituacoesTrilha Management Detail Component', () => {
  let comp: SituacoesTrilhaDetailComponent;
  let fixture: ComponentFixture<SituacoesTrilhaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SituacoesTrilhaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ situacoesTrilha: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SituacoesTrilhaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SituacoesTrilhaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load situacoesTrilha on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.situacoesTrilha).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
