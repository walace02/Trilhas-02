import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMunicipios, Municipios } from '../municipios.model';
import { MunicipiosService } from '../service/municipios.service';

import { MunicipiosRoutingResolveService } from './municipios-routing-resolve.service';

describe('Municipios routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MunicipiosRoutingResolveService;
  let service: MunicipiosService;
  let resultMunicipios: IMunicipios | undefined;

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
    routingResolveService = TestBed.inject(MunicipiosRoutingResolveService);
    service = TestBed.inject(MunicipiosService);
    resultMunicipios = undefined;
  });

  describe('resolve', () => {
    it('should return IMunicipios returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMunicipios = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMunicipios).toEqual({ id: 123 });
    });

    it('should return new IMunicipios if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMunicipios = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMunicipios).toEqual(new Municipios());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Municipios })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMunicipios = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMunicipios).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
