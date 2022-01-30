import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CadastroTrilhaComponent } from '../list/cadastro-trilha.component';
import { CadastroTrilhaDetailComponent } from '../detail/cadastro-trilha-detail.component';
import { CadastroTrilhaUpdateComponent } from '../update/cadastro-trilha-update.component';
import { CadastroTrilhaRoutingResolveService } from './cadastro-trilha-routing-resolve.service';

const cadastroTrilhaRoute: Routes = [
  {
    path: '',
    component: CadastroTrilhaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CadastroTrilhaDetailComponent,
    resolve: {
      cadastroTrilha: CadastroTrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CadastroTrilhaUpdateComponent,
    resolve: {
      cadastroTrilha: CadastroTrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CadastroTrilhaUpdateComponent,
    resolve: {
      cadastroTrilha: CadastroTrilhaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cadastroTrilhaRoute)],
  exports: [RouterModule],
})
export class CadastroTrilhaRoutingModule {}
