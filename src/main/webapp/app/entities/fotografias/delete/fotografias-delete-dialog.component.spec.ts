jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FotografiasService } from '../service/fotografias.service';

import { FotografiasDeleteDialogComponent } from './fotografias-delete-dialog.component';

describe('Fotografias Management Delete Component', () => {
  let comp: FotografiasDeleteDialogComponent;
  let fixture: ComponentFixture<FotografiasDeleteDialogComponent>;
  let service: FotografiasService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FotografiasDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(FotografiasDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FotografiasDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FotografiasService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
