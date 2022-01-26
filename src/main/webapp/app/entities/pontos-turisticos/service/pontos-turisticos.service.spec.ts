import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPontosTuristicos, PontosTuristicos } from '../pontos-turisticos.model';

import { PontosTuristicosService } from './pontos-turisticos.service';

describe('PontosTuristicos Service', () => {
  let service: PontosTuristicosService;
  let httpMock: HttpTestingController;
  let elemDefault: IPontosTuristicos;
  let expectedResult: IPontosTuristicos | IPontosTuristicos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PontosTuristicosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
      avaliacao: 'AAAAAAA',
      tiposPontosTuristicos: 'AAAAAAA',
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

    it('should create a PontosTuristicos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PontosTuristicos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PontosTuristicos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          avaliacao: 'BBBBBB',
          tiposPontosTuristicos: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PontosTuristicos', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          avaliacao: 'BBBBBB',
          tiposPontosTuristicos: 'BBBBBB',
        },
        new PontosTuristicos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PontosTuristicos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          avaliacao: 'BBBBBB',
          tiposPontosTuristicos: 'BBBBBB',
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

    it('should delete a PontosTuristicos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPontosTuristicosToCollectionIfMissing', () => {
      it('should add a PontosTuristicos to an empty array', () => {
        const pontosTuristicos: IPontosTuristicos = { id: 123 };
        expectedResult = service.addPontosTuristicosToCollectionIfMissing([], pontosTuristicos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pontosTuristicos);
      });

      it('should not add a PontosTuristicos to an array that contains it', () => {
        const pontosTuristicos: IPontosTuristicos = { id: 123 };
        const pontosTuristicosCollection: IPontosTuristicos[] = [
          {
            ...pontosTuristicos,
          },
          { id: 456 },
        ];
        expectedResult = service.addPontosTuristicosToCollectionIfMissing(pontosTuristicosCollection, pontosTuristicos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PontosTuristicos to an array that doesn't contain it", () => {
        const pontosTuristicos: IPontosTuristicos = { id: 123 };
        const pontosTuristicosCollection: IPontosTuristicos[] = [{ id: 456 }];
        expectedResult = service.addPontosTuristicosToCollectionIfMissing(pontosTuristicosCollection, pontosTuristicos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pontosTuristicos);
      });

      it('should add only unique PontosTuristicos to an array', () => {
        const pontosTuristicosArray: IPontosTuristicos[] = [{ id: 123 }, { id: 456 }, { id: 38255 }];
        const pontosTuristicosCollection: IPontosTuristicos[] = [{ id: 123 }];
        expectedResult = service.addPontosTuristicosToCollectionIfMissing(pontosTuristicosCollection, ...pontosTuristicosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pontosTuristicos: IPontosTuristicos = { id: 123 };
        const pontosTuristicos2: IPontosTuristicos = { id: 456 };
        expectedResult = service.addPontosTuristicosToCollectionIfMissing([], pontosTuristicos, pontosTuristicos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pontosTuristicos);
        expect(expectedResult).toContain(pontosTuristicos2);
      });

      it('should accept null and undefined values', () => {
        const pontosTuristicos: IPontosTuristicos = { id: 123 };
        expectedResult = service.addPontosTuristicosToCollectionIfMissing([], null, pontosTuristicos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pontosTuristicos);
      });

      it('should return initial array if no PontosTuristicos is added', () => {
        const pontosTuristicosCollection: IPontosTuristicos[] = [{ id: 123 }];
        expectedResult = service.addPontosTuristicosToCollectionIfMissing(pontosTuristicosCollection, undefined, null);
        expect(expectedResult).toEqual(pontosTuristicosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
