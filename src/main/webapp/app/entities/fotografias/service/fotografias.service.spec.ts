import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFotografias, Fotografias } from '../fotografias.model';

import { FotografiasService } from './fotografias.service';

describe('Fotografias Service', () => {
  let service: FotografiasService;
  let httpMock: HttpTestingController;
  let elemDefault: IFotografias;
  let expectedResult: IFotografias | IFotografias[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FotografiasService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
      autor: 'AAAAAAA',
      avaliacao: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Fotografias', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Fotografias()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Fotografias', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          autor: 'BBBBBB',
          avaliacao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Fotografias', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
          avaliacao: 'BBBBBB',
        },
        new Fotografias()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Fotografias', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          autor: 'BBBBBB',
          avaliacao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Fotografias', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFotografiasToCollectionIfMissing', () => {
      it('should add a Fotografias to an empty array', () => {
        const fotografias: IFotografias = { id: 123 };
        expectedResult = service.addFotografiasToCollectionIfMissing([], fotografias);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fotografias);
      });

      it('should not add a Fotografias to an array that contains it', () => {
        const fotografias: IFotografias = { id: 123 };
        const fotografiasCollection: IFotografias[] = [
          {
            ...fotografias,
          },
          { id: 456 },
        ];
        expectedResult = service.addFotografiasToCollectionIfMissing(fotografiasCollection, fotografias);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Fotografias to an array that doesn't contain it", () => {
        const fotografias: IFotografias = { id: 123 };
        const fotografiasCollection: IFotografias[] = [{ id: 456 }];
        expectedResult = service.addFotografiasToCollectionIfMissing(fotografiasCollection, fotografias);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fotografias);
      });

      it('should add only unique Fotografias to an array', () => {
        const fotografiasArray: IFotografias[] = [{ id: 123 }, { id: 456 }, { id: 56254 }];
        const fotografiasCollection: IFotografias[] = [{ id: 123 }];
        expectedResult = service.addFotografiasToCollectionIfMissing(fotografiasCollection, ...fotografiasArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fotografias: IFotografias = { id: 123 };
        const fotografias2: IFotografias = { id: 456 };
        expectedResult = service.addFotografiasToCollectionIfMissing([], fotografias, fotografias2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fotografias);
        expect(expectedResult).toContain(fotografias2);
      });

      it('should accept null and undefined values', () => {
        const fotografias: IFotografias = { id: 123 };
        expectedResult = service.addFotografiasToCollectionIfMissing([], null, fotografias, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fotografias);
      });

      it('should return initial array if no Fotografias is added', () => {
        const fotografiasCollection: IFotografias[] = [{ id: 123 }];
        expectedResult = service.addFotografiasToCollectionIfMissing(fotografiasCollection, undefined, null);
        expect(expectedResult).toEqual(fotografiasCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
