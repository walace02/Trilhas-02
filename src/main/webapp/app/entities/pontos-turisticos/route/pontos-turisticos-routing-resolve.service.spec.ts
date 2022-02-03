import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPontosTuristicos, PontosTuristicos } from '../pontos-turisticos.model';
import { PontosTuristicosService } from '../service/pontos-turisticos.service';

import { PontosTuristicosRoutingResolveService } from './pontos-turisticos-routing-resolve.service';

describe('PontosTuristicos routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PontosTuristicosRoutingResolveService;
  let service: PontosTuristicosService;
  let resultPontosTuristicos: IPontosTuristicos | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(PontosTuristicosRoutingResolveService);
    service = TestBed.inject(PontosTuristicosService);
    resultPontosTuristicos = undefined;
  });

  describe('resolve', () => {
    it('should return IPontosTuristicos returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPontosTuristicos = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPontosTuristicos).toEqual({ id: 123 });
    });

    it('should return new IPontosTuristicos if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPontosTuristicos = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPontosTuristicos).toEqual(new PontosTuristicos());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PontosTuristicos })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPontosTuristicos = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPontosTuristicos).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
