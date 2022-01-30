import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISituacoesTrilha, SituacoesTrilha } from '../situacoes-trilha.model';
import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';

import { SituacoesTrilhaRoutingResolveService } from './situacoes-trilha-routing-resolve.service';

describe('SituacoesTrilha routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SituacoesTrilhaRoutingResolveService;
  let service: SituacoesTrilhaService;
  let resultSituacoesTrilha: ISituacoesTrilha | undefined;

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
    routingResolveService = TestBed.inject(SituacoesTrilhaRoutingResolveService);
    service = TestBed.inject(SituacoesTrilhaService);
    resultSituacoesTrilha = undefined;
  });

  describe('resolve', () => {
    it('should return ISituacoesTrilha returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSituacoesTrilha = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSituacoesTrilha).toEqual({ id: 123 });
    });

    it('should return new ISituacoesTrilha if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSituacoesTrilha = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSituacoesTrilha).toEqual(new SituacoesTrilha());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SituacoesTrilha })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSituacoesTrilha = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSituacoesTrilha).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
