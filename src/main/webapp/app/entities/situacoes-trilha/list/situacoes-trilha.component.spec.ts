import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';

import { SituacoesTrilhaComponent } from './situacoes-trilha.component';

describe('SituacoesTrilha Management Component', () => {
  let comp: SituacoesTrilhaComponent;
  let fixture: ComponentFixture<SituacoesTrilhaComponent>;
  let service: SituacoesTrilhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SituacoesTrilhaComponent],
    })
      .overrideTemplate(SituacoesTrilhaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SituacoesTrilhaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SituacoesTrilhaService);

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
    expect(comp.situacoesTrilhas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
