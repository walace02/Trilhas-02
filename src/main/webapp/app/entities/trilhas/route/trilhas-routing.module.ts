import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TrilhasComponent } from '../list/trilhas.component';
import { TrilhasDetailComponent } from '../detail/trilhas-detail.component';
import { TrilhasUpdateComponent } from '../update/trilhas-update.component';
import { TrilhasRoutingResolveService } from './trilhas-routing-resolve.service';

const trilhasRoute: Routes = [
  {
    path: '',
    component: TrilhasComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrilhasDetailComponent,
    resolve: {
      trilhas: TrilhasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrilhasUpdateComponent,
    resolve: {
      trilhas: TrilhasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrilhasUpdateComponent,
    resolve: {
      trilhas: TrilhasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trilhasRoute)],
  exports: [RouterModule],
})
export class TrilhasRoutingModule {}
