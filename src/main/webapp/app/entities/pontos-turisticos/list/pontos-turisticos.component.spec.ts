import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PontosTuristicosService } from '../service/pontos-turisticos.service';

import { PontosTuristicosComponent } from './pontos-turisticos.component';

describe('PontosTuristicos Management Component', () => {
  let comp: PontosTuristicosComponent;
  let fixture: ComponentFixture<PontosTuristicosComponent>;
  let service: PontosTuristicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PontosTuristicosComponent],
    })
      .overrideTemplate(PontosTuristicosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PontosTuristicosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PontosTuristicosService);

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
    expect(comp.pontosTuristicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
