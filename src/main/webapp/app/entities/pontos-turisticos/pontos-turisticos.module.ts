import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PontosTuristicosComponent } from './list/pontos-turisticos.component';
import { PontosTuristicosDetailComponent } from './detail/pontos-turisticos-detail.component';
import { PontosTuristicosUpdateComponent } from './update/pontos-turisticos-update.component';
import { PontosTuristicosDeleteDialogComponent } from './delete/pontos-turisticos-delete-dialog.component';
import { PontosTuristicosRoutingModule } from './route/pontos-turisticos-routing.module';

@NgModule({
  imports: [SharedModule, PontosTuristicosRoutingModule],
  declarations: [
    PontosTuristicosComponent,
    PontosTuristicosDetailComponent,
    PontosTuristicosUpdateComponent,
    PontosTuristicosDeleteDialogComponent,
  ],
  entryComponents: [PontosTuristicosDeleteDialogComponent],
})
export class PontosTuristicosModule {}
