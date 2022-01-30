import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICadastroTrilha, CadastroTrilha } from '../cadastro-trilha.model';
import { CadastroTrilhaService } from '../service/cadastro-trilha.service';

@Injectable({ providedIn: 'root' })
export class CadastroTrilhaRoutingResolveService implements Resolve<ICadastroTrilha> {
  constructor(protected service: CadastroTrilhaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICadastroTrilha> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cadastroTrilha: HttpResponse<CadastroTrilha>) => {
          if (cadastroTrilha.body) {
            return of(cadastroTrilha.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CadastroTrilha());
  }
}
