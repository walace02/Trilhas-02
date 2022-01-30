import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FotografiasComponent } from '../list/fotografias.component';
import { FotografiasDetailComponent } from '../detail/fotografias-detail.component';
import { FotografiasUpdateComponent } from '../update/fotografias-update.component';
import { FotografiasRoutingResolveService } from './fotografias-routing-resolve.service';

const fotografiasRoute: Routes = [
  {
    path: '',
    component: FotografiasComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FotografiasDetailComponent,
    resolve: {
      fotografias: FotografiasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FotografiasUpdateComponent,
    resolve: {
      fotografias: FotografiasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FotografiasUpdateComponent,
    resolve: {
      fotografias: FotografiasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fotografiasRoute)],
  exports: [RouterModule],
})
export class FotografiasRoutingModule {}
