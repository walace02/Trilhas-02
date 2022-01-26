import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPontosVenda, PontosVenda } from '../pontos-venda.model';

import { PontosVendaService } from './pontos-venda.service';

describe('PontosVenda Service', () => {
  let service: PontosVendaService;
  let httpMock: HttpTestingController;
  let elemDefault: IPontosVenda;
  let expectedResult: IPontosVenda | IPontosVenda[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PontosVendaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
      avaliacao: 0,
      tiposPontosVenda: 'AAAAAAA',
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

    it('should create a PontosVenda', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PontosVenda()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PontosVenda', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          avaliacao: 1,
          tiposPontosVenda: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PontosVenda', () => {
      const patchObject = Object.assign(
        {
          descricao: 'BBBBBB',
          avaliacao: 1,
        },
        new PontosVenda()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PontosVenda', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
          avaliacao: 1,
          tiposPontosVenda: 'BBBBBB',
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

    it('should delete a PontosVenda', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPontosVendaToCollectionIfMissing', () => {
      it('should add a PontosVenda to an empty array', () => {
        const pontosVenda: IPontosVenda = { id: 123 };
        expectedResult = service.addPontosVendaToCollectionIfMissing([], pontosVenda);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pontosVenda);
      });

      it('should not add a PontosVenda to an array that contains it', () => {
        const pontosVenda: IPontosVenda = { id: 123 };
        const pontosVendaCollection: IPontosVenda[] = [
          {
            ...pontosVenda,
          },
          { id: 456 },
        ];
        expectedResult = service.addPontosVendaToCollectionIfMissing(pontosVendaCollection, pontosVenda);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PontosVenda to an array that doesn't contain it", () => {
        const pontosVenda: IPontosVenda = { id: 123 };
        const pontosVendaCollection: IPontosVenda[] = [{ id: 456 }];
        expectedResult = service.addPontosVendaToCollectionIfMissing(pontosVendaCollection, pontosVenda);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pontosVenda);
      });

      it('should add only unique PontosVenda to an array', () => {
        const pontosVendaArray: IPontosVenda[] = [{ id: 123 }, { id: 456 }, { id: 80947 }];
        const pontosVendaCollection: IPontosVenda[] = [{ id: 123 }];
        expectedResult = service.addPontosVendaToCollectionIfMissing(pontosVendaCollection, ...pontosVendaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pontosVenda: IPontosVenda = { id: 123 };
        const pontosVenda2: IPontosVenda = { id: 456 };
        expectedResult = service.addPontosVendaToCollectionIfMissing([], pontosVenda, pontosVenda2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pontosVenda);
        expect(expectedResult).toContain(pontosVenda2);
      });

      it('should accept null and undefined values', () => {
        const pontosVenda: IPontosVenda = { id: 123 };
        expectedResult = service.addPontosVendaToCollectionIfMissing([], null, pontosVenda, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pontosVenda);
      });

      it('should return initial array if no PontosVenda is added', () => {
        const pontosVendaCollection: IPontosVenda[] = [{ id: 123 }];
        expectedResult = service.addPontosVendaToCollectionIfMissing(pontosVendaCollection, undefined, null);
        expect(expectedResult).toEqual(pontosVendaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
