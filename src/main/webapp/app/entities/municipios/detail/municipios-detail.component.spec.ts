import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MunicipiosDetailComponent } from './municipios-detail.component';

describe('Municipios Management Detail Component', () => {
  let comp: MunicipiosDetailComponent;
  let fixture: ComponentFixture<MunicipiosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunicipiosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ municipios: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MunicipiosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MunicipiosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load municipios on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.municipios).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
