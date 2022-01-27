import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISituacoesTrilha, SituacoesTrilha } from '../situacoes-trilha.model';

import { SituacoesTrilhaService } from './situacoes-trilha.service';

describe('SituacoesTrilha Service', () => {
  let service: SituacoesTrilhaService;
  let httpMock: HttpTestingController;
  let elemDefault: ISituacoesTrilha;
  let expectedResult: ISituacoesTrilha | ISituacoesTrilha[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SituacoesTrilhaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      situacao: false,
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

    it('should create a SituacoesTrilha', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new SituacoesTrilha()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SituacoesTrilha', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          situacao: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SituacoesTrilha', () => {
      const patchObject = Object.assign({}, new SituacoesTrilha());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SituacoesTrilha', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          situacao: true,
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

    it('should delete a SituacoesTrilha', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSituacoesTrilhaToCollectionIfMissing', () => {
      it('should add a SituacoesTrilha to an empty array', () => {
        const situacoesTrilha: ISituacoesTrilha = { id: 123 };
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing([], situacoesTrilha);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(situacoesTrilha);
      });

      it('should not add a SituacoesTrilha to an array that contains it', () => {
        const situacoesTrilha: ISituacoesTrilha = { id: 123 };
        const situacoesTrilhaCollection: ISituacoesTrilha[] = [
          {
            ...situacoesTrilha,
          },
          { id: 456 },
        ];
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing(situacoesTrilhaCollection, situacoesTrilha);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SituacoesTrilha to an array that doesn't contain it", () => {
        const situacoesTrilha: ISituacoesTrilha = { id: 123 };
        const situacoesTrilhaCollection: ISituacoesTrilha[] = [{ id: 456 }];
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing(situacoesTrilhaCollection, situacoesTrilha);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(situacoesTrilha);
      });

      it('should add only unique SituacoesTrilha to an array', () => {
        const situacoesTrilhaArray: ISituacoesTrilha[] = [{ id: 123 }, { id: 456 }, { id: 5903 }];
        const situacoesTrilhaCollection: ISituacoesTrilha[] = [{ id: 123 }];
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing(situacoesTrilhaCollection, ...situacoesTrilhaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const situacoesTrilha: ISituacoesTrilha = { id: 123 };
        const situacoesTrilha2: ISituacoesTrilha = { id: 456 };
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing([], situacoesTrilha, situacoesTrilha2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(situacoesTrilha);
        expect(expectedResult).toContain(situacoesTrilha2);
      });

      it('should accept null and undefined values', () => {
        const situacoesTrilha: ISituacoesTrilha = { id: 123 };
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing([], null, situacoesTrilha, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(situacoesTrilha);
      });

      it('should return initial array if no SituacoesTrilha is added', () => {
        const situacoesTrilhaCollection: ISituacoesTrilha[] = [{ id: 123 }];
        expectedResult = service.addSituacoesTrilhaToCollectionIfMissing(situacoesTrilhaCollection, undefined, null);
        expect(expectedResult).toEqual(situacoesTrilhaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
