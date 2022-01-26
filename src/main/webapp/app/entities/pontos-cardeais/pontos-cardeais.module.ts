import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PontosCardeaisComponent } from './list/pontos-cardeais.component';
import { PontosCardeaisDetailComponent } from './detail/pontos-cardeais-detail.component';
import { PontosCardeaisUpdateComponent } from './update/pontos-cardeais-update.component';
import { PontosCardeaisDeleteDialogComponent } from './delete/pontos-cardeais-delete-dialog.component';
import { PontosCardeaisRoutingModule } from './route/pontos-cardeais-routing.module';

@NgModule({
  imports: [SharedModule, PontosCardeaisRoutingModule],
  declarations: [
    PontosCardeaisComponent,
    PontosCardeaisDetailComponent,
    PontosCardeaisUpdateComponent,
    PontosCardeaisDeleteDialogComponent,
  ],
  entryComponents: [PontosCardeaisDeleteDialogComponent],
})
export class PontosCardeaisModule {}
