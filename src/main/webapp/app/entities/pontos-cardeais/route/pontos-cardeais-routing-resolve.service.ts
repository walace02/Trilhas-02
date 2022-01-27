import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPontosCardeais, PontosCardeais } from '../pontos-cardeais.model';
import { PontosCardeaisService } from '../service/pontos-cardeais.service';

@Injectable({ providedIn: 'root' })
export class PontosCardeaisRoutingResolveService implements Resolve<IPontosCardeais> {
  constructor(protected service: PontosCardeaisService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPontosCardeais> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pontosCardeais: HttpResponse<PontosCardeais>) => {
          if (pontosCardeais.body) {
            return of(pontosCardeais.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PontosCardeais());
  }
}
