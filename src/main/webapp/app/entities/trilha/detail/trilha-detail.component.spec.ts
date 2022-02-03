import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrilhaDetailComponent } from './trilha-detail.component';

describe('Trilha Management Detail Component', () => {
  let comp: TrilhaDetailComponent;
  let fixture: ComponentFixture<TrilhaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrilhaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ trilha: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TrilhaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TrilhaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load trilha on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.trilha).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
