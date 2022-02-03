import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PontosCardeaisComponent } from '../list/pontos-cardeais.component';
import { PontosCardeaisDetailComponent } from '../detail/pontos-cardeais-detail.component';
import { PontosCardeaisUpdateComponent } from '../update/pontos-cardeais-update.component';
import { PontosCardeaisRoutingResolveService } from './pontos-cardeais-routing-resolve.service';

const pontosCardeaisRoute: Routes = [
  {
    path: '',
    component: PontosCardeaisComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PontosCardeaisDetailComponent,
    resolve: {
      pontosCardeais: PontosCardeaisRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PontosCardeaisUpdateComponent,
    resolve: {
      pontosCardeais: PontosCardeaisRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PontosCardeaisUpdateComponent,
    resolve: {
      pontosCardeais: PontosCardeaisRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pontosCardeaisRoute)],
  exports: [RouterModule],
})
export class PontosCardeaisRoutingModule {}
