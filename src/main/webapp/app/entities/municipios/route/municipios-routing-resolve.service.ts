import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMunicipios, Municipios } from '../municipios.model';
import { MunicipiosService } from '../service/municipios.service';

@Injectable({ providedIn: 'root' })
export class MunicipiosRoutingResolveService implements Resolve<IMunicipios> {
  constructor(protected service: MunicipiosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMunicipios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((municipios: HttpResponse<Municipios>) => {
          if (municipios.body) {
            return of(municipios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Municipios());
  }
}
