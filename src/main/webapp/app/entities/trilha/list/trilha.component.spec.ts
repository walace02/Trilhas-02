import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TrilhaService } from '../service/trilha.service';

import { TrilhaComponent } from './trilha.component';

describe('Trilha Management Component', () => {
  let comp: TrilhaComponent;
  let fixture: ComponentFixture<TrilhaComponent>;
  let service: TrilhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TrilhaComponent],
    })
      .overrideTemplate(TrilhaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrilhaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TrilhaService);

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
