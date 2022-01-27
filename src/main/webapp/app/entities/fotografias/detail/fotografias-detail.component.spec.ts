import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FotografiasDetailComponent } from './fotografias-detail.component';

describe('Fotografias Management Detail Component', () => {
  let comp: FotografiasDetailComponent;
  let fixture: ComponentFixture<FotografiasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotografiasDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fotografias: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FotografiasDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FotografiasDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load fotografias on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fotografias).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
