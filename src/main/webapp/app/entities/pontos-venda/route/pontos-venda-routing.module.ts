import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PontosVendaComponent } from '../list/pontos-venda.component';
import { PontosVendaDetailComponent } from '../detail/pontos-venda-detail.component';
import { PontosVendaUpdateComponent } from '../update/pontos-venda-update.component';
import { PontosVendaRoutingResolveService } from './pontos-venda-routing-resolve.service';

const pontosVendaRoute: Routes = [
  {
    path: '',
    component: PontosVendaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PontosVendaDetailComponent,
    resolve: {
      pontosVenda: PontosVendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PontosVendaUpdateComponent,
    resolve: {
      pontosVenda: PontosVendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PontosVendaUpdateComponent,
    resolve: {
      pontosVenda: PontosVendaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pontosVendaRoute)],
  exports: [RouterModule],
})
export class PontosVendaRoutingModule {}
