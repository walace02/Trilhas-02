import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TrilhasService } from '../service/trilhas.service';

import { TrilhasComponent } from './trilhas.component';

describe('Trilhas Management Component', () => {
  let comp: TrilhasComponent;
  let fixture: ComponentFixture<TrilhasComponent>;
  let service: TrilhasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TrilhasComponent],
    })
      .overrideTemplate(TrilhasComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrilhasComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TrilhasService);

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
    expect(comp.trilhas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
