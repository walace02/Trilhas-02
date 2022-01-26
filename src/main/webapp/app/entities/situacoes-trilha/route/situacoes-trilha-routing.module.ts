import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SituacoesTrilhaComponent } from '../list/situacoes-trilha.component';
import { SituacoesTrilhaDetailComponent } from '../detail/situacoes-trilha-detail.component';
import { SituacoesTrilhaUpdateComponent } from '../update/situacoes-trilha-update.component';
import { SituacoesTrilhaRoutingResolveService } from './situacoes-trilha-routing-resolve.service';

const situacoesTrilhaRoute: Routes = [
  {
    path: '',
    component: SituacoesTrilhaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SituacoesTrilhaDetailComponent,
    resolve: {
      situacoesTrilha: SituacoesTrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SituacoesTrilhaUpdateComponent,
    resolve: {
      situacoesTrilha: SituacoesTrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SituacoesTrilhaUpdateComponent,
    resolve: {
      situacoesTrilha: SituacoesTrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(situacoesTrilhaRoute)],
  exports: [RouterModule],
})
export class SituacoesTrilhaRoutingModule {}
