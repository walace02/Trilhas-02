import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMunicipios, Municipios } from '../municipios.model';

import { MunicipiosService } from './municipios.service';

describe('Municipios Service', () => {
  let service: MunicipiosService;
  let httpMock: HttpTestingController;
  let elemDefault: IMunicipios;
  let expectedResult: IMunicipios | IMunicipios[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MunicipiosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nome: 'AAAAAAA',
      descricao: 'AAAAAAA',
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

    it('should create a Municipios', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Municipios()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Municipios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Municipios', () => {
      const patchObject = Object.assign(
        {
          nome: 'BBBBBB',
        },
        new Municipios()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Municipios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nome: 'BBBBBB',
          descricao: 'BBBBBB',
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

    it('should delete a Municipios', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMunicipiosToCollectionIfMissing', () => {
      it('should add a Municipios to an empty array', () => {
        const municipios: IMunicipios = { id: 123 };
        expectedResult = service.addMunicipiosToCollectionIfMissing([], municipios);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(municipios);
      });

      it('should not add a Municipios to an array that contains it', () => {
        const municipios: IMunicipios = { id: 123 };
        const municipiosCollection: IMunicipios[] = [
          {
            ...municipios,
          },
          { id: 456 },
        ];
        expectedResult = service.addMunicipiosToCollectionIfMissing(municipiosCollection, municipios);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Municipios to an array that doesn't contain it", () => {
        const municipios: IMunicipios = { id: 123 };
        const municipiosCollection: IMunicipios[] = [{ id: 456 }];
        expectedResult = service.addMunicipiosToCollectionIfMissing(municipiosCollection, municipios);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(municipios);
      });

      it('should add only unique Municipios to an array', () => {
        const municipiosArray: IMunicipios[] = [{ id: 123 }, { id: 456 }, { id: 56765 }];
        const municipiosCollection: IMunicipios[] = [{ id: 123 }];
        expectedResult = service.addMunicipiosToCollectionIfMissing(municipiosCollection, ...municipiosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const municipios: IMunicipios = { id: 123 };
        const municipios2: IMunicipios = { id: 456 };
        expectedResult = service.addMunicipiosToCollectionIfMissing([], municipios, municipios2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(municipios);
        expect(expectedResult).toContain(municipios2);
      });

      it('should accept null and undefined values', () => {
        const municipios: IMunicipios = { id: 123 };
        expectedResult = service.addMunicipiosToCollectionIfMissing([], null, municipios, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(municipios);
      });

      it('should return initial array if no Municipios is added', () => {
        const municipiosCollection: IMunicipios[] = [{ id: 123 }];
        expectedResult = service.addMunicipiosToCollectionIfMissing(municipiosCollection, undefined, null);
        expect(expectedResult).toEqual(municipiosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
