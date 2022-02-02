import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PontosCardeaisService } from '../service/pontos-cardeais.service';

import { PontosCardeaisComponent } from './pontos-cardeais.component';

describe('PontosCardeais Management Component', () => {
  let comp: PontosCardeaisComponent;
  let fixture: ComponentFixture<PontosCardeaisComponent>;
  let service: PontosCardeaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PontosCardeaisComponent],
    })
      .overrideTemplate(PontosCardeaisComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PontosCardeaisComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PontosCardeaisService);

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
    expect(comp.pontosCardeais?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
