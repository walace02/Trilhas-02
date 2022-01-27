import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFotografias, Fotografias } from '../fotografias.model';
import { FotografiasService } from '../service/fotografias.service';

@Injectable({ providedIn: 'root' })
export class FotografiasRoutingResolveService implements Resolve<IFotografias> {
  constructor(protected service: FotografiasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFotografias> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fotografias: HttpResponse<Fotografias>) => {
          if (fotografias.body) {
            return of(fotografias.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fotografias());
  }
}
