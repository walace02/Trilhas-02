import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISituacoesTrilha, SituacoesTrilha } from '../situacoes-trilha.model';
import { SituacoesTrilhaService } from '../service/situacoes-trilha.service';

@Injectable({ providedIn: 'root' })
export class SituacoesTrilhaRoutingResolveService implements Resolve<ISituacoesTrilha> {
  constructor(protected service: SituacoesTrilhaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISituacoesTrilha> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((situacoesTrilha: HttpResponse<SituacoesTrilha>) => {
          if (situacoesTrilha.body) {
            return of(situacoesTrilha.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SituacoesTrilha());
  }
}
