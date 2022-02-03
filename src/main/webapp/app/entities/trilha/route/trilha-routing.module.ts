import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TrilhaComponent } from '../list/trilha.component';
import { TrilhaDetailComponent } from '../detail/trilha-detail.component';
import { TrilhaUpdateComponent } from '../update/trilha-update.component';
import { TrilhaRoutingResolveService } from './trilha-routing-resolve.service';

const trilhaRoute: Routes = [
  {
    path: '',
    component: TrilhaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrilhaDetailComponent,
    resolve: {
      trilha: TrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrilhaUpdateComponent,
    resolve: {
      trilha: TrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrilhaUpdateComponent,
    resolve: {
      trilha: TrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trilhaRoute)],
  exports: [RouterModule],
})
export class TrilhaRoutingModule {}
