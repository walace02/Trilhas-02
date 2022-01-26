import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITrilhas, Trilhas } from '../trilhas.model';
import { TrilhasService } from '../service/trilhas.service';

@Injectable({ providedIn: 'root' })
export class TrilhasRoutingResolveService implements Resolve<ITrilhas> {
  constructor(protected service: TrilhasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrilhas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((trilhas: HttpResponse<Trilhas>) => {
          if (trilhas.body) {
            return of(trilhas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Trilhas());
  }
}
