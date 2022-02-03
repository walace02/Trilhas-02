import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITrilha, Trilha } from '../trilha.model';

import { TrilhaService } from './trilha.service';

describe('Trilha Service', () => {
  let service: TrilhaService;
  let httpMock: HttpTestingController;
  let elemDefault: ITrilha;
  let expectedResult: ITrilha | ITrilha[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TrilhaService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nomeTrilha: 'AAAAAAA',
      nomeMunicipio: 'AAAAAAA',
      descricao: 'AAAAAAA',
      comprimento: 0,
      data: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Trilha', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.create(new Trilha()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Trilha', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomeTrilha: 'BBBBBB',
          nomeMunicipio: 'BBBBBB',
          descricao: 'BBBBBB',
          comprimento: 1,
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Trilha', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
          comprimento: 1,
        },
        new Trilha()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Trilha', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomeTrilha: 'BBBBBB',
          nomeMunicipio: 'BBBBBB',
          descricao: 'BBBBBB',
          comprimento: 1,
          data: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          data: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Trilha', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTrilhaToCollectionIfMissing', () => {
      it('should add a Trilha to an empty array', () => {
        const trilha: ITrilha = { id: 123 };
        expectedResult = service.addTrilhaToCollectionIfMissing([], trilha);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trilha);
      });

      it('should not add a Trilha to an array that contains it', () => {
        const trilha: ITrilha = { id: 123 };
        const trilhaCollection: ITrilha[] = [
          {
            ...trilha,
          },
          { id: 456 },
        ];
        expectedResult = service.addTrilhaToCollectionIfMissing(trilhaCollection, trilha);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Trilha to an array that doesn't contain it", () => {
        const trilha: ITrilha = { id: 123 };
        const trilhaCollection: ITrilha[] = [{ id: 456 }];
        expectedResult = service.addTrilhaToCollectionIfMissing(trilhaCollection, trilha);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trilha);
      });

      it('should add only unique Trilha to an array', () => {
        const trilhaArray: ITrilha[] = [{ id: 123 }, { id: 456 }, { id: 56290 }];
        const trilhaCollection: ITrilha[] = [{ id: 123 }];
        expectedResult = service.addTrilhaToCollectionIfMissing(trilhaCollection, ...trilhaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trilha: ITrilha = { id: 123 };
        const trilha2: ITrilha = { id: 456 };
        expectedResult = service.addTrilhaToCollectionIfMissing([], trilha, trilha2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trilha);
        expect(expectedResult).toContain(trilha2);
      });

      it('should accept null and undefined values', () => {
        const trilha: ITrilha = { id: 123 };
        expectedResult = service.addTrilhaToCollectionIfMissing([], null, trilha, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trilha);
      });

      it('should return initial array if no Trilha is added', () => {
        const trilhaCollection: ITrilha[] = [{ id: 123 }];
        expectedResult = service.addTrilhaToCollectionIfMissing(trilhaCollection, undefined, null);
        expect(expectedResult).toEqual(trilhaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
