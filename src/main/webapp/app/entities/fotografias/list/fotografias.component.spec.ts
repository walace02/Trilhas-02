import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FotografiasService } from '../service/fotografias.service';

import { FotografiasComponent } from './fotografias.component';

describe('Fotografias Management Component', () => {
  let comp: FotografiasComponent;
  let fixture: ComponentFixture<FotografiasComponent>;
  let service: FotografiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FotografiasComponent],
    })
      .overrideTemplate(FotografiasComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FotografiasComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FotografiasService);

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
    expect(comp.fotografias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
