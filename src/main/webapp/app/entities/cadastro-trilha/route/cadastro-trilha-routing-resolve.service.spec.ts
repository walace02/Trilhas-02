import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICadastroTrilha, CadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';

import { CadastroTrilhaRoutingResolveService } from './cadastro-trilha-routing-resolve.service';

describe('CadastroTrilha routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CadastroTrilhaRoutingResolveService;
  let service: CadastroTrilhaService;
  let resultCadastroTrilha: ICadastroTrilha | undefined;

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
    routingResolveService = TestBed.inject(CadastroTrilhaRoutingResolveService);
    service = TestBed.inject(CadastroTrilhaService);
    resultCadastroTrilha = undefined;
  });

  describe('resolve', () => {
    it('should return ICadastroTrilha returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCadastroTrilha = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCadastroTrilha).toEqual({ id: 123 });
    });

    it('should return new ICadastroTrilha if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCadastroTrilha = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCadastroTrilha).toEqual(new CadastroTrilha());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CadastroTrilha })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCadastroTrilha = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCadastroTrilha).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
