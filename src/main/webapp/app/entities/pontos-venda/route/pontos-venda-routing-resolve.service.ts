import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPontosVenda, PontosVenda } from '../pontos-venda.model';
import { PontosVendaService } from '../service/pontos-venda.service';

@Injectable({ providedIn: 'root' })
export class PontosVendaRoutingResolveService implements Resolve<IPontosVenda> {
  constructor(protected service: PontosVendaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPontosVenda> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pontosVenda: HttpResponse<PontosVenda>) => {
          if (pontosVenda.body) {
            return of(pontosVenda.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PontosVenda());
  }
}
