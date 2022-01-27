import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CadastroTrilhaService } from '../service/cadastro-trilha.service';

import { CadastroTrilhaComponent } from './cadastro-trilha.component';

describe('CadastroTrilha Management Component', () => {
  let comp: CadastroTrilhaComponent;
  let fixture: ComponentFixture<CadastroTrilhaComponent>;
  let service: CadastroTrilhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CadastroTrilhaComponent],
    })
      .overrideTemplate(CadastroTrilhaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CadastroTrilhaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CadastroTrilhaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.cadastroTrilhas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
