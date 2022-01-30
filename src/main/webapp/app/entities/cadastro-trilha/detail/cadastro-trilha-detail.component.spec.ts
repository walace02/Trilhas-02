import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CadastroTrilhaDetailComponent } from './cadastro-trilha-detail.component';

describe('CadastroTrilha Management Detail Component', () => {
  let comp: CadastroTrilhaDetailComponent;
  let fixture: ComponentFixture<CadastroTrilhaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroTrilhaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cadastroTrilha: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CadastroTrilhaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CadastroTrilhaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cadastroTrilha on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cadastroTrilha).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
