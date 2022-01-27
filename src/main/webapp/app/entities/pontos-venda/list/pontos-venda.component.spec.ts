import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PontosVendaService } from '../service/pontos-venda.service';

import { PontosVendaComponent } from './pontos-venda.component';

describe('PontosVenda Management Component', () => {
  let comp: PontosVendaComponent;
  let fixture: ComponentFixture<PontosVendaComponent>;
  let service: PontosVendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PontosVendaComponent],
    })
      .overrideTemplate(PontosVendaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PontosVendaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PontosVendaService);

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
    expect(comp.pontosVendas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
