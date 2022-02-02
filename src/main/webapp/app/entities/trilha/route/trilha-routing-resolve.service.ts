import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITrilha, Trilha } from '../trilha.model';
import { TrilhaService } from '../service/trilha.service';

@Injectable({ providedIn: 'root' })
export class TrilhaRoutingResolveService implements Resolve<ITrilha> {
  constructor(protected service: TrilhaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrilha> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((trilha: HttpResponse<Trilha>) => {
          if (trilha.body) {
            return of(trilha.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Trilha());
  }
}
