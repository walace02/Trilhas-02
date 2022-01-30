import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MunicipiosComponent } from '../list/municipios.component';
import { MunicipiosDetailComponent } from '../detail/municipios-detail.component';
import { MunicipiosUpdateComponent } from '../update/municipios-update.component';
import { MunicipiosRoutingResolveService } from './municipios-routing-resolve.service';

const municipiosRoute: Routes = [
  {
    path: '',
    component: MunicipiosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MunicipiosDetailComponent,
    resolve: {
      municipios: MunicipiosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MunicipiosUpdateComponent,
    resolve: {
      municipios: MunicipiosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MunicipiosUpdateComponent,
    resolve: {
      municipios: MunicipiosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(municipiosRoute)],
  exports: [RouterModule],
})
export class MunicipiosRoutingModule {}
