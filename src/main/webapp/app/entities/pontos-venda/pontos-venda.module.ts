import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PontosVendaComponent } from './list/pontos-venda.component';
import { PontosVendaDetailComponent } from './detail/pontos-venda-detail.component';
import { PontosVendaUpdateComponent } from './update/pontos-venda-update.component';
import { PontosVendaDeleteDialogComponent } from './delete/pontos-venda-delete-dialog.component';
import { PontosVendaRoutingModule } from './route/pontos-venda-routing.module';

@NgModule({
  imports: [SharedModule, PontosVendaRoutingModule],
  declarations: [PontosVendaComponent, PontosVendaDetailComponent, PontosVendaUpdateComponent, PontosVendaDeleteDialogComponent],
  entryComponents: [PontosVendaDeleteDialogComponent],
})
export class PontosVendaModule {}
