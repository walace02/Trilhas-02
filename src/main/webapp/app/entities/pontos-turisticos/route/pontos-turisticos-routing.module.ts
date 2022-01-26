import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PontosTuristicosComponent } from '../list/pontos-turisticos.component';
import { PontosTuristicosDetailComponent } from '../detail/pontos-turisticos-detail.component';
import { PontosTuristicosUpdateComponent } from '../update/pontos-turisticos-update.component';
import { PontosTuristicosRoutingResolveService } from './pontos-turisticos-routing-resolve.service';

const pontosTuristicosRoute: Routes = [
  {
    path: '',
    component: PontosTuristicosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PontosTuristicosDetailComponent,
    resolve: {
      pontosTuristicos: PontosTuristicosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PontosTuristicosUpdateComponent,
    resolve: {
      pontosTuristicos: PontosTuristicosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PontosTuristicosUpdateComponent,
    resolve: {
      pontosTuristicos: PontosTuristicosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pontosTuristicosRoute)],
  exports: [RouterModule],
})
export class PontosTuristicosRoutingModule {}
