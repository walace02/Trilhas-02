import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrilhasDetailComponent } from './trilhas-detail.component';

describe('Trilhas Management Detail Component', () => {
  let comp: TrilhasDetailComponent;
  let fixture: ComponentFixture<TrilhasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrilhasDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ trilhas: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TrilhasDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TrilhasDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load trilhas on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.trilhas).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
