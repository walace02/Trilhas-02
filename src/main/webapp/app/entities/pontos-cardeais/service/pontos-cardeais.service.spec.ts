import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';

import { PontosCardeaisService } from './pontos-cardeais.service';

describe('PontosCardeais Service', () => {
  let service: PontosCardeaisService;
  let httpMock: HttpTestingController;
  let elemDefault: IPontosCardeais;
  let expectedResult: IPontosCardeais | IPontosCardeais[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PontosCardeaisService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      latitude: 0,
      longitude: 0,
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

    it('should create a PontosCardeais', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PontosCardeais()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PontosCardeais', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          latitude: 1,
          longitude: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PontosCardeais', () => {
      const patchObject = Object.assign(
        {
          latitude: 1,
          longitude: 1,
        },
        new PontosCardeais()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PontosCardeais', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          latitude: 1,
          longitude: 1,
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

    it('should delete a PontosCardeais', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPontosCardeaisToCollectionIfMissing', () => {
      it('should add a PontosCardeais to an empty array', () => {
        const pontosCardeais: IPontosCardeais = { id: 123 };
        expectedResult = service.addPontosCardeaisToCollectionIfMissing([], pontosCardeais);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pontosCardeais);
      });

      it('should not add a PontosCardeais to an array that contains it', () => {
        const pontosCardeais: IPontosCardeais = { id: 123 };
        const pontosCardeaisCollection: IPontosCardeais[] = [
          {
            ...pontosCardeais,
          },
          { id: 456 },
        ];
        expectedResult = service.addPontosCardeaisToCollectionIfMissing(pontosCardeaisCollection, pontosCardeais);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PontosCardeais to an array that doesn't contain it", () => {
        const pontosCardeais: IPontosCardeais = { id: 123 };
        const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 456 }];
        expectedResult = service.addPontosCardeaisToCollectionIfMissing(pontosCardeaisCollection, pontosCardeais);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pontosCardeais);
      });

      it('should add only unique PontosCardeais to an array', () => {
        const pontosCardeaisArray: IPontosCardeais[] = [{ id: 123 }, { id: 456 }, { id: 77795 }];
        const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 123 }];
        expectedResult = service.addPontosCardeaisToCollectionIfMissing(pontosCardeaisCollection, ...pontosCardeaisArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pontosCardeais: IPontosCardeais = { id: 123 };
        const pontosCardeais2: IPontosCardeais = { id: 456 };
        expectedResult = service.addPontosCardeaisToCollectionIfMissing([], pontosCardeais, pontosCardeais2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pontosCardeais);
        expect(expectedResult).toContain(pontosCardeais2);
      });

      it('should accept null and undefined values', () => {
        const pontosCardeais: IPontosCardeais = { id: 123 };
        expectedResult = service.addPontosCardeaisToCollectionIfMissing([], null, pontosCardeais, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pontosCardeais);
      });

      it('should return initial array if no PontosCardeais is added', () => {
        const pontosCardeaisCollection: IPontosCardeais[] = [{ id: 123 }];
        expectedResult = service.addPontosCardeaisToCollectionIfMissing(pontosCardeaisCollection, undefined, null);
        expect(expectedResult).toEqual(pontosCardeaisCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
