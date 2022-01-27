import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MunicipiosService } from '../service/municipios.service';

import { MunicipiosComponent } from './municipios.component';

describe('Municipios Management Component', () => {
  let comp: MunicipiosComponent;
  let fixture: ComponentFixture<MunicipiosComponent>;
  let service: MunicipiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MunicipiosComponent],
    })
      .overrideTemplate(MunicipiosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MunicipiosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MunicipiosService);

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
    expect(comp.municipios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
