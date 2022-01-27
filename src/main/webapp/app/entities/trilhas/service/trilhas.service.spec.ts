import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITrilhas, Trilhas } from '../trilhas.model';

import { TrilhasService } from './trilhas.service';

describe('Trilhas Service', () => {
  let service: TrilhasService;
  let httpMock: HttpTestingController;
  let elemDefault: ITrilhas;
  let expectedResult: ITrilhas | ITrilhas[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TrilhasService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
      comprimento: 0,
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

    it('should create a Trilhas', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Trilhas()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Trilhas', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          comprimento: 1,
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

    it('should partial update a Trilhas', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
          avaliacao: 'BBBBBB',
        },
        new Trilhas()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Trilhas', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          comprimento: 1,
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

    it('should delete a Trilhas', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTrilhasToCollectionIfMissing', () => {
      it('should add a Trilhas to an empty array', () => {
        const trilhas: ITrilhas = { id: 123 };
        expectedResult = service.addTrilhasToCollectionIfMissing([], trilhas);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trilhas);
      });

      it('should not add a Trilhas to an array that contains it', () => {
        const trilhas: ITrilhas = { id: 123 };
        const trilhasCollection: ITrilhas[] = [
          {
            ...trilhas,
          },
          { id: 456 },
        ];
        expectedResult = service.addTrilhasToCollectionIfMissing(trilhasCollection, trilhas);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Trilhas to an array that doesn't contain it", () => {
        const trilhas: ITrilhas = { id: 123 };
        const trilhasCollection: ITrilhas[] = [{ id: 456 }];
        expectedResult = service.addTrilhasToCollectionIfMissing(trilhasCollection, trilhas);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trilhas);
      });

      it('should add only unique Trilhas to an array', () => {
        const trilhasArray: ITrilhas[] = [{ id: 123 }, { id: 456 }, { id: 75777 }];
        const trilhasCollection: ITrilhas[] = [{ id: 123 }];
        expectedResult = service.addTrilhasToCollectionIfMissing(trilhasCollection, ...trilhasArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trilhas: ITrilhas = { id: 123 };
        const trilhas2: ITrilhas = { id: 456 };
        expectedResult = service.addTrilhasToCollectionIfMissing([], trilhas, trilhas2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trilhas);
        expect(expectedResult).toContain(trilhas2);
      });

      it('should accept null and undefined values', () => {
        const trilhas: ITrilhas = { id: 123 };
        expectedResult = service.addTrilhasToCollectionIfMissing([], null, trilhas, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trilhas);
      });

      it('should return initial array if no Trilhas is added', () => {
        const trilhasCollection: ITrilhas[] = [{ id: 123 }];
        expectedResult = service.addTrilhasToCollectionIfMissing(trilhasCollection, undefined, null);
        expect(expectedResult).toEqual(trilhasCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
