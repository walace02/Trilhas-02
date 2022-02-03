import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPontosTuristicos, PontosTuristicos } from '../pontos-turisticos.model';
import { PontosTuristicosService } from '../service/pontos-turisticos.service';

@Injectable({ providedIn: 'root' })
export class PontosTuristicosRoutingResolveService implements Resolve<IPontosTuristicos> {
  constructor(protected service: PontosTuristicosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPontosTuristicos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pontosTuristicos: HttpResponse<PontosTuristicos>) => {
          if (pontosTuristicos.body) {
            return of(pontosTuristicos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PontosTuristicos());
  }
}
